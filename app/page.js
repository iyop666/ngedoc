'use client'
import { useState } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('translate')
  const [usage, setUsage] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleTranslate = async () => {
    if (!input.trim() || loading) return
    setLoading(true)
    setOutput('')
    setUsage(null)

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, mode }),
      })
      const data = await res.json()
      if (data.error) {
        setOutput(`Error: ${data.error}`)
      } else {
        setOutput(data.result)
        setUsage(data.usage)
      }
    } catch (err) {
      setOutput(`Error: ${err.message}`)
    }
    setLoading(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const modes = [
    { id: 'translate', label: 'Terjemahin', icon: '🌐', desc: 'Translate ke Indonesia' },
    { id: 'explain', label: 'Jelasin', icon: '💡', desc: 'Jelasin pake bahasa gampang' },
    { id: 'summarize', label: 'Rangkum', icon: '📝', desc: 'Rangkum jadi singkat' },
  ]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ padding: '20px 32px', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #10b981, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📄</div>
          <span style={{ fontSize: 24, fontWeight: 800, background: 'linear-gradient(135deg, #10b981, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NgeDoc</span>
        </div>
        <a href="https://github.com/iyop666/ngedoc" target="_blank" rel="noopener" style={{ color: '#888', textDecoration: 'none', fontSize: 14 }}>GitHub</a>
      </header>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '48px 24px 24px' }}>
        <h1 style={{ fontSize: 48, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
          <span style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NgeDoc</span>
          <span style={{ color: '#666' }}> in.</span>
        </h1>
        <p style={{ color: '#888', fontSize: 18, marginTop: 12, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
          Dokumentasi teknis bahasa Inggris bikin pusing? <br />
          <strong style={{ color: '#ccc' }}>NgeDoc-in aja.</strong> AI translate, jelasin, atau rangkum ke Bahasa Indonesia.
        </p>
      </div>

      {/* Mode Selector */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, padding: '0 24px', flexWrap: 'wrap' }}>
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              padding: '12px 20px',
              borderRadius: 12,
              border: mode === m.id ? '2px solid #10b981' : '2px solid #222',
              background: mode === m.id ? '#0a2a1a' : '#111',
              color: mode === m.id ? '#10b981' : '#888',
              cursor: 'pointer',
              fontSize: 15,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s',
            }}
          >
            <span style={{ fontSize: 18 }}>{m.icon}</span>
            {m.label}
            <span style={{ fontSize: 12, color: '#555', fontWeight: 400 }}>{m.desc}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', gap: 16, padding: '24px 32px', maxWidth: 1200, margin: '0 auto', width: '100%', boxSizing: 'border-box', flexWrap: 'wrap' }}>
        {/* Input */}
        <div style={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: 13, color: '#666', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
            Input (English)
          </label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste dokumentasi bahasa Inggris di sini...

Contoh:
# Getting Started
To install the package, run:
```npm install my-package```
Then import it in your code:
```import { feature } from 'my-package'```"
            style={{
              flex: 1,
              minHeight: 350,
              background: '#111',
              border: '1px solid #222',
              borderRadius: 12,
              padding: 16,
              color: '#e5e5e5',
              fontSize: 14,
              lineHeight: 1.7,
              fontFamily: "'JetBrains Mono', monospace",
              resize: 'vertical',
              outline: 'none',
            }}
          />
          <button
            onClick={handleTranslate}
            disabled={loading || !input.trim()}
            style={{
              marginTop: 12,
              padding: '14px 24px',
              borderRadius: 12,
              border: 'none',
              background: loading || !input.trim() ? '#222' : 'linear-gradient(135deg, #10b981, #3b82f6)',
              color: loading || !input.trim() ? '#555' : '#fff',
              fontSize: 16,
              fontWeight: 700,
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {loading ? '⏳ NgeDoc-in...' : `🚀 ${modes.find(m => m.id === mode)?.label}`}
          </button>
        </div>

        {/* Output */}
        <div style={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, color: '#666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
              Output (Indonesia)
            </label>
            {output && (
              <button
                onClick={handleCopy}
                style={{
                  background: copied ? '#10b981' : '#222',
                  color: copied ? '#fff' : '#888',
                  border: 'none',
                  borderRadius: 8,
                  padding: '6px 12px',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                {copied ? '✅ Copied!' : '📋 Copy'}
              </button>
            )}
          </div>
          <div style={{
            flex: 1,
            minHeight: 350,
            background: '#111',
            border: '1px solid #222',
            borderRadius: 12,
            padding: 16,
            color: '#e5e5e5',
            fontSize: 14,
            lineHeight: 1.7,
            whiteSpace: 'pre-wrap',
            overflowY: 'auto',
          }}>
            {output || <span style={{ color: '#444' }}>Hasil terjemahan muncul di sini...</span>}
          </div>
          {usage && (
            <div style={{ marginTop: 8, fontSize: 12, color: '#555', textAlign: 'right' }}>
              Tokens: {usage.total_tokens} (prompt: {usage.prompt_tokens}, completion: {usage.completion_tokens})
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '48px 32px', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
          {[
            { icon: '🔒', title: 'Code Aman', desc: 'Code blocks, variable names, dan formatting tetap utuh. Gak diotak-atik.' },
            { icon: '🇮🇩', title: 'Bahasa Natural', desc: 'Bukan terjemahan kaku. Pake bahasa Indonesia yang dipake developer sehari-hari.' },
            { icon: '⚡', title: 'Powered by GPT', desc: 'Pakai OpenAI GPT-4o-mini. Cepat, akurat, dan hemat token.' },
          ].map((f, i) => (
            <div key={i} style={{ background: '#111', borderRadius: 12, padding: 24, border: '1px solid #1a1a1a' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ margin: '0 0 8px', fontSize: 16, color: '#fff' }}>{f.title}</h3>
              <p style={{ margin: 0, color: '#888', fontSize: 14, lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '24px 32px', borderTop: '1px solid #1a1a1a', textAlign: 'center', color: '#444', fontSize: 13 }}>
        Built with Next.js + OpenAI. Made in Indonesia 🇮🇩
      </footer>
    </div>
  )
}
