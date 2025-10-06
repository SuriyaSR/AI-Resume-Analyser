# 🌿 Unsplash Image Explorer (Work in Progress)

A **React + TypeScript + Vite** application to explore images from the **Unsplash API**.  
This project is currently in **active development**. Core features like **search with debounce** and **infinite scrolling** are implemented, with more enhancements planned.

---

## 🚀 Current Features

- Search Unsplash images with **debounced input**  
- **Infinite scroll** to load more images while scrolling  
- Responsive **grid layout** using Tailwind CSS  
- Photo cards showing photographer details and clickable links to Unsplash  
- Custom hooks for:
  - Infinite scrolling
  - Intersection observer
  - Debounced search

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS |
| Data Fetching | Axios, React Query |
| API | Unsplash REST API |
| State & Hooks | Custom hooks for debounce and intersection observer |

---

## 🛠️ Setup & Running Locally

1. **Clone the repository**
```bash
git clone https://github.com/SuriyaSR/unsplash-explorer.git
cd unsplash-explorer
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file in the root:**
```bash
VITE_UNSPLASH_ACCESS_KEY=your_access_key_here
```

4. **Run development server**
```bash
npm run dev
```

5. **Open in browser:**
```bash
http://localhost:5173
```

## ⚡ Planned Features

- Lightbox / modal view for images
- Category filters (Nature, Travel, Technology, etc.)
- Dark mode toggle
- Bookmark favorite images locally
- Unit & integration testing
