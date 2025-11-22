# MadreTierra Cigars Website

A beautiful, elegant website for MadreTierra Cigars built with React and TailwindCSS, inspired by Macanudo Cigars' design.

## Features

- 🎨 Elegant design with custom color palette
- 📱 Fully responsive design
- ⚡ Built with React and Vite for fast performance
- 🎭 Smooth animations and transitions
- 🧩 Modular component architecture

## Color Palette

- **Primary**: `#014421` (Dark Green)
- **Secondary**: `#D4AF37` (Gold)
- **Tertiary**: `#7B4F28` (Brown)
- **Dark**: `#0A0A0A` (Near Black)
- **Light**: `#F8F8F5` (Off-white/Cream)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
MadreTierra2.0/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Collections.jsx
│   │   ├── Featured.jsx
│   │   ├── About.jsx
│   │   ├── WhereToBuy.jsx
│   │   ├── Experience.jsx
│   │   ├── Newsletter.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Technologies Used

- **React** - UI library
- **TailwindCSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **PostCSS** - CSS processing

## Customization

The color palette can be customized in `tailwind.config.js` under the `theme.extend.colors` section.

## License

© 2025 MadreTierra Cigars. All rights reserved.

