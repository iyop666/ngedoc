import { NextResponse } from 'next/server'

export async function POST(request) {
  const { text, mode } = await request.json()

  if (!text) {
    return NextResponse.json({ error: 'Text is required' }, { status: 400 })
  }

  const systemPrompts = {
    translate: `You are NgeDoc, an expert technical documentation translator specializing in English to Indonesian (Bahasa Indonesia) translation for developer documentation.

Rules:
1. Translate English technical documentation to natural, professional Indonesian
2. PRESERVE all code blocks, inline code, URLs, and markdown formatting exactly as-is
3. Keep technical terms in English when commonly used (API, CLI, npm, git, deploy, server, database, framework, library, package, repository, commit, pull request, merge, etc.)
4. Use proper Indonesian grammar and sentence structure
5. Keep section headers translated but maintain markdown format (# ## ###)
6. Do NOT translate variable names, function names, or code examples
7. Use "Anda" for formal or "kamu" for casual (default to "Anda" for docs)
8. Translate technical concepts naturally, don't force-translate everything
9. Keep bullet points, numbered lists, tables in original format
10. Output ONLY the translated text, no explanations`,

    explain: `You are NgeDoc, an AI that explains technical documentation in simple Indonesian (Bahasa Indonesia).

Rules:
1. Read the English documentation provided
2. Explain what it does in simple, easy-to-understand Indonesian
3. Break down complex concepts into digestible parts
4. Use examples when helpful
5. Keep code references in original English
6. Write in a friendly, approachable tone
7. Structure the explanation with clear headings
8. Add practical tips where relevant`,

    summarize: `You are NgeDoc, an AI that summarizes technical documentation into concise Indonesian.

Rules:
1. Read the English documentation
2. Create a clear, concise summary in Indonesian
3. Highlight the most important points
4. Keep technical terms in English
5. Use bullet points for key features/steps
6. Include any important warnings or notes
7. Maximum 30% of original length`
  }

  const systemPrompt = systemPrompts[mode] || systemPrompts.translate

  // Try Gemini first (free), then OpenAI (paid)
  const geminiKey = process.env.GEMINI_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY

  if (geminiKey) {
    try {
      return await callGemini(geminiKey, systemPrompt, text, mode)
    } catch (error) {
      if (!openaiKey) {
        return NextResponse.json({ error: `Gemini error: ${error.message}` }, { status: 500 })
      }
    }
  }

  if (openaiKey) {
    try {
      return await callOpenAI(openaiKey, systemPrompt, text, mode)
    } catch (error) {
      return NextResponse.json({ error: `OpenAI error: ${error.message}` }, { status: 500 })
    }
  }

  return NextResponse.json({
    error: 'No API key configured. Set GEMINI_API_KEY (free) or OPENAI_API_KEY in environment variables.'
  }, { status: 500 })
}

async function callGemini(apiKey, systemPrompt, text, mode) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ parts: [{ text }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 4096,
        },
      }),
    }
  )

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error?.message || 'Gemini API error')
  }

  const data = await response.json()
  const result = data.candidates?.[0]?.content?.parts?.[0]?.text

  if (!result) throw new Error('No response from Gemini')

  return NextResponse.json({
    result,
    usage: {
      prompt_tokens: data.usageMetadata?.promptTokenCount || 0,
      completion_tokens: data.usageMetadata?.candidatesTokenCount || 0,
      total_tokens: data.usageMetadata?.totalTokenCount || 0,
    },
    mode,
    provider: 'gemini',
  })
}

async function callOpenAI(apiKey, systemPrompt, text, mode) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text }
      ],
      temperature: 0.3,
      max_tokens: 4096,
    }),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error?.message || 'OpenAI API error')
  }

  const data = await response.json()
  return NextResponse.json({
    result: data.choices[0].message.content,
    usage: data.usage,
    mode,
    provider: 'openai',
  })
}
