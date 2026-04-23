# 🌞 AI CleanBot - TÜBİTAK Solar Project


<div align="center">
  
  [![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
  [![Gemini API](https://img.shields.io/badge/Gemini_API-1.50-4285F4?logo=google)](https://ai.google.dev/gemini-api)
  [![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
  
</div>

## 📖 About The Project

**AI CleanBot** is an autonomous solar panel cleaning system management dashboard developed as part of a TÜBİTAK 2209/A research project. The application provides a comprehensive interface for monitoring solar panel efficiency, controlling cleaning robots, and leveraging AI-powered image analysis to detect dirt, dust, and bird droppings on photovoltaic panels.

### ✨ Key Features

- **🎮 Real-Time Telemetry Dashboard** – Live monitoring of voltage, current, efficiency, and battery levels with interactive charts (Recharts)
- **🤖 AI-Powered Image Analysis** – Upload solar panel photos and let Google Gemini AI detect dirt density and recommend cleaning actions
- **🕹️ Robot Control Simulation** – Manual override controls (directional pad) and autonomous mode commands (start/stop/docking)
- **📄 Project Proposal Viewer** – Markdown-rendered TÜBİTAK project summary with key objectives and methodology
- **📱 Fully Responsive** – Mobile-friendly sidebar navigation and adaptive layouts
- **🎨 Modern UI/UX** – Smooth animations with Framer Motion, custom Tailwind theme, and nature-inspired color palette

---

## 🛠️ Built With

- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4 + Custom `@theme` configuration
- **Charts:** Recharts 3.8
- **Animations:** Framer Motion 12
- **Icons:** Lucide React
- **Markdown Rendering:** React Markdown
- **AI Integration:** Google Gemini API (`@google/genai` v1.50)
- **Development Server:** Express (for potential backend extensions)

---

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites

- **Node.js** (v20 or later recommended)
- **npm** (v10+)
- A **Google Gemini API key** – [Get one for free](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository** (or extract the project files)

2. **Install dependencies**
   ```
   npm install
   ```
3. Set up environment variables
 Create a .env.local file in the project root and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Run the development server
   ```
   npm run dev
   ```
    The app will be available at http://localhost:3000
5. Build for production (optional)
   ```
   npm run build
   ```
   ```
   npm run preview
   ```
---   
### 📁 Project Structure
```
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx          # Telemetry charts & stats cards
│   │   ├── ImageProcessor.tsx     # AI image upload & analysis
│   │   ├── RobotControl.tsx       # Manual & autonomous commands
│   │   └── ProposalViewer.tsx     # TÜBİTAK proposal markdown
│   ├── services/
│   │   └── geminiService.ts       # Gemini API integration
│   ├── constants.ts               # Proposal markdown content
│   ├── types.ts                   # TypeScript interfaces
│   ├── App.tsx                    # Main layout & navigation
│   ├── main.tsx                   # React entry point
│   └── index.css                  # Tailwind imports & global styles
├── index.html
├── package.json
├── vite.config.ts
└── .env.local                     # API keys (ignored by git)
```
---
🧪 Usage Guide

1. Panel Dashboard (Default View)

* View real-time telemetry: voltage, current, battery, and efficiency
* Charts update every 5 seconds with simulated data (easily replaceable with live sensor feed)
* Efficiency loss alerts when battery drops below 20%

2. AI Görüntü Analizi (Image Analysis)

* Click the upload area to select a solar panel photo (JPEG/PNG)
* The image is sent to Google Gemini (model gemini-3-flash-preview)
* AI returns:
    * isDirty: Boolean (dirt/bird droppings detected)
    * dirtDensity: 0–100 scale
    * recommendation: Actionable advice in Turkish
    * estimatedEfficiencyLoss: Percentage loss due to soiling
* If dirt is found, a “TEMİZLİĞİ BAŞLAT” button appears to trigger cleaning (UI simulation)

3. Robot Kontrolü (Robot Control)

* System Commands: Start, Emergency Stop, Docking Mode
* Manual Override: Directional pad (Up, Down, Left, Right) for fine positioning
* Status indicator shows real-time robot state: idle, cleaning, returning

4. Proje Detayları (Project Details)

* Displays the TÜBİTAK project proposal (abstract, keywords, methodology)
* Sidebar includes system load (memory usage) and version info

---

🔌 API Integration

The app uses Google Gemini API for image analysis. The service function analyzePanelImage() lives in src/services/geminiService.ts. It expects:

* A base64-encoded image string (data URL)
* A structured prompt asking for JSON output

Response format:
```
{
  "isDirty": true,
  "dirtDensity": 65,
  "recommendation": "Temizlik programı başlatılmalı",
  "estimatedEfficiencyLoss": 12.5
}
```
Note: The API key is injected via vite.config.ts using define and read from process.env.GEMINI_API_KEY. Ensure .env.local is properly configured.

## 🧪 Development & Simulation

Current telemetry data is simulated for demonstration purposes. To connect real sensors (e.g., Arduino + HC-05 Bluetooth), replace the setInterval logic in App.tsx with a WebSocket or serial data stream.

Robot commands are logged to the console. You can extend handleCommand() to send actual signals via Bluetooth (using Web Bluetooth API or a backend bridge).
---

### 📄 License

Distributed under the Apache License 2.0. See SPDX-License-Identifier: Apache-2.0 in source files for details.

---

### 🤝 Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.
Fork the repo, create a feature branch, and submit a pull request.

---

### 📬 Contact & Demo

* Live Demo (AI Studio): https://ai.studio/apps/2ec5aeff-1dae-49d3-b588-921f844511cc￼
* Project Repository: [Add your GitHub URL here]
* TÜBİTAK Project ID: 2209/A – AI CleanBot

<div align="center">
  <sub>Built with ❤️ for sustainable solar energy & autonomous robotics</sub>
</div>

