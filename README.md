
# 📖 The Volume of the Book
**A Divine Scripture Study Assistant & Bible Reader**

---

### 👤 Contact Information
- **LinkedIn:** [olayinkahopewell](https://www.linkedin.com/in/olayinkahopewell/) 🔗
- **GitHub:** [Dev-Laolu](https://github.com/Dev-Laolu) 🚀
- **Portfolio:** [laoluthecreator](https://sites.google.com/view/laoluthecreator/) 🎨

---

### ✨ Project Overview
**The Volume of the Book** is more than just a Bible application; it's a platform developed as a pathway for learning and building tools that help believers grow in their faith in Christ. By combining modern web technologies with spiritual study, this project aims to provide a seamless and enriching experience for scriptural exploration.

---

### 🛠 Tech Stack
- **Frontend Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **AI Integration:** [Google Generative AI (Gemini API)](https://ai.google.dev/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Icons:** [Heroicons](https://heroicons.com/)

---

### 📁 Project Structure
```text
the-volume-of-the-book/
├── components/           # UI Components
│   ├── BibleReader.tsx   # Core bible reading interface
│   ├── Home.tsx          # Landing page
│   ├── NotFound.tsx      # 404 Error page
│   ├── Search.tsx        # Scripture search functionality
│   ├── Splash.tsx        # Initial loading screen
│   └── StudyAssistant.tsx # AI-powered study help
├── services/             # Backend logic & API services
│   ├── bibleService.ts   # Bible text retrieval logic
│   └── scriptureService.ts # AI & Search integration
├── src/                  # Assets and images
├── utils/                # Helper functions
├── App.tsx               # Main application entry
├── index.tsx             # DOM mounting
├── constants.tsx         # Global constants
├── types.ts              # TypeScript definitions
└── package.json          # Dependencies & scripts
```

---

### 🔧 Key Features & Fixes
- **AI Study Assistant:** Integrated Gemini AI to help users understand deep scriptural contexts.
- **Responsive Design:** Optimized for both desktop and mobile users, featuring sticky appearance settings for comfortable reading.
- **Bible Search:** Efficient searching through scriptures for specific verses or topics.
- **Visual Enhancements:** Added verse separators, smooth animations, and a polished UI for a premium feel.
- **Bug Fixes:** Resolved issues with video asset imports, 404 routing, and mobile UI responsiveness.

---

### 💸 Implementation Cost
The project primarily utilizes the **Google Gemini API**.
- **Free Tier:** Currently operating within the free tier limits provided by Google AI Studio, making it accessible for development and testing without immediate infrastructure costs.
- **Scalability:** Designed to be easily scaled to a paid tier if user demand increases.

---

### 🚀 Getting Started
**Prerequisites:** [Node.js](https://nodejs.org/)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Dev-Laolu/the-volume-of-the-book.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment:**
   Set your `GEMINI_API_KEY` in `.env.local`:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```

---

### 🙏 Purpose
Developed with a focus on faith, this project serves as a testament to technical growth and a commitment to building technology that serves the body of Christ.
