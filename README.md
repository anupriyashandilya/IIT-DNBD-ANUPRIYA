# 🎤 AI Voice Interview Assistant

A full-stack **voice-based interview assistant** that answers questions **as me**, in real time.  
The project demonstrates how modern language models can be integrated into user-facing applications with clean architecture, cost-aware design, and production-ready deployment.

---

## 🚀 Project Overview

This application allows users to ask interview questions using their **voice** and receive **spoken, context-aware responses** tailored to a specific persona and job role.

The assistant:
- Listens to spoken questions 🎙️
- Interprets intent using browser speech recognition
- Generates interview-style answers via a large language model
- Speaks responses back naturally 🔊

The entire system is deployed as a **single full-stack service**.

---

## ✨ Core Features

- 🎤 Voice input using Web Speech API  
- 🗣️ Voice output using browser text-to-speech  
- 🧠 Persona-driven responses (answers as the candidate, not generic AI)  
- 💸 Cost-efficient prompt design (persona stored server-side)  
- 🔐 Secure API key handling  
- 🌐 Single-URL deployment (frontend + backend together)  

---

## 🏗️ Architecture

Browser (React UI)
↓ Voice Input
Node.js + Express (Persona & AI logic)
↓
Groq LLM API


- React handles UI and voice interactions
- Node.js manages persona context and LLM calls
- The backend also serves the React production build

---

## 🛠️ Tech Stack

**Frontend**
- React
- JavaScript
- Web Speech API

**Backend**
- Node.js
- Express
- Axios

**AI**
- Groq API
- LLaMA 3.1 (Instant)

**Deployment**
- Render (single full-stack service)

---

## 📁 Project Structure

```
voice-bot/
├── backend/ # Express server & AI logic
│ ├── index.js
│ └── package.json
│
├── src/ # React source code
│ ├── App.js
│ ├── VoiceBot.js
│ └── VoiceBot.css
│
├── public/
├── build/ # Production React build
├── package.json
└── README.md
```


---

## ⚙️ Local Setup

```bash
git clone https://github.com/your-username/voice-bot.git
cd voice-bot
npm install
cd backend
npm install
```
### Create a .env file (local only):
```
GROQ_API_KEY=your_api_key_here
```

### Build and run:
```
npm run build
node backend/index.js
```

### Visit:
```
http://localhost:5000.
```
