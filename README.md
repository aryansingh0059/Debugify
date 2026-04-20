# ⚡ Debugify — AI-Powered Code Reviewer

Debugify is a high-performance, full-stack application designed to help developers ship **10x faster** by catching bugs, security flaws, and performance bottlenecks using state-of-the-art AI.

![Debugify Hero](https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200)

## ✨ Key Features

- **🚀 Instant Analysis**: Real-time code review powered by Llama-3.3-70b (via Groq API).
- **🛠️ Auto-Fix Suggestions**: One-click solutions for identified bugs with detailed explanations.
- **🌐 Multi-Language Support**: Supports 16+ languages including JavaScript, Python, Java, C++, Rust, and more.
- **🔐 Secure Authentication**: JWT-based auth with a clean, distraction-free login/registration flow.
- **🎨 Premium UI/UX**: Modern dark-mode interface with glassmorphism, smooth animations (Framer Motion), and a responsive code editor (Monaco).

## 🛠️ Technology Stack

### Frontend
- **React + Vite**: For a lightning-fast development experience and optimized builds.
- **Vanilla CSS + Tailwind**: Custom glassmorphic design system.
- **Framer Motion**: For fluid, state-based animations.
- **Monaco Editor**: The same powerful editor that powers VS Code.

### Backend
- **Node.js + Express**: Scalable server-side architecture.
- **MongoDB**: For user data and session management.
- **Groq API**: High-speed AI inference for code analysis.
- **JWT**: Secure token-based authentication.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- [Groq API Key](https://console.groq.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aryansingh0059/Debugify.git
   cd Debugify
   ```

2. **Setup Server**
   ```bash
   cd server
   npm install
   # Create a .env file and add your credentials:
   # PORT=5000
   # MONGO_URI=your_mongodb_uri
   # JWT_SECRET=your_secret_key
   # GROQ_API_KEY=your_groq_api_key
   npm start
   ```

3. **Setup Client**
   ```bash
   cd ../client
   npm install
   # Create a .env file:
   # VITE_API_URL=http://localhost:5000
   npm run dev
   ```

## 📖 Usage
1. **Sign Up/Login**: Create an account to access the dashboard.
2. **Paste Code**: Drop your code snippet into the Monaco Editor.
3. **Select Language**: Pick the correct language from the top-right dropdown.
4. **Debug**: Click "Review My Code" and wait for the AI to analyze.
5. **Fix**: Review the bugs and click "Auto-fix" to apply corrections instantly.

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.

---
Built with ⚡ by [Aryan Singh](https://github.com/aryansingh0059)