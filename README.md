# 📄 NgeDoc

**Dokumentasi teknis bahasa Inggris bikin pusing? NgeDoc-in aja.**

NgeDoc adalah AI-powered tool yang translate, jelasin, dan rangkum dokumentasi teknis bahasa Inggris ke Bahasa Indonesia. Built for Indonesian developers yang sering struggle baca docs bahasa Inggris.

![NgeDoc](https://img.shields.io/badge/NgeDoc-v1.0.0-10b981?style=for-the-badge&logo=openai&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-000?style=for-the-badge&logo=next.js&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=for-the-badge&logo=openai&logoColor=white)

## Apa aja yang bisa?

### 🌐 Terjemahin
Translate dokumentasi teknis ke Bahasa Indonesia. Code blocks, variable names, dan formatting tetap utuh. Gak diotak-atik.

### 💡 Jelasin
Gak ngerti dokumentasinya? NgeDoc jelasin pake bahasa yang lebih gampang dipahami. Break down konsep kompleks jadi sederhana.

### 📝 Rangkum
Dokumentasi kepanjangan? NgeDoc rangkum jadi poin-poin penting aja. Hemat waktu.

## Tech Stack

- **Frontend:** Next.js 14 (App Router)
- **AI:** OpenAI GPT-4o-mini
- **Styling:** Inline CSS (zero dependencies)
- **Deploy:** Vercel

## Cara Pakai

1. Buka [ngedoc.vercel.app](https://ngedoc.vercel.app)
2. Pilih mode (Terjemahin / Jelasin / Rangkum)
3. Paste dokumentasi bahasa Inggris
4. Klik tombol
5. Copy hasilnya

## Local Development

```bash
git clone https://github.com/iyop666/ngedoc.git
cd ngedoc
npm install

# Set OpenAI API key
echo "OPENAI_API_KEY=sk-your-key" > .env.local

npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/iyop666/ngedoc)

Atau manual:

```bash
npm run build
npx vercel --prod
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | OpenAI API key (GPT-4o-mini) |

## Kenapa NgeDoc?

Sebagai developer Indonesia, kita sering nemu dokumentasi teknis yang cuma ada bahasa Inggris. Kadang paham, kadang gak. NgeDoc bantu translate ke bahasa yang lebih familiar tanpa mengubah kode dan teknisnya.

**NgeDoc bukan pengganti belajar bahasa Inggris.** NgeDoc adalah tool bantu buat yang lagi butuh cepat paham dokumentasi.

## Fitur

- ✅ 3 mode: Translate, Explain, Summarize
- ✅ Preserve code blocks & formatting
- ✅ Bahasa natural, bukan terjemahan kaku
- ✅ Tech terms tetap bahasa Inggris (API, CLI, npm, dll)
- ✅ Copy hasil dengan satu klik
- ✅ Token usage tracking
- ✅ Dark mode (default)
- ✅ Mobile responsive
- ✅ Zero dependencies di frontend

## License

MIT

---

Built with 🇮🇩 by [iyop666](https://github.com/iyop666)
