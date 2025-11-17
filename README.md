# Axiom Trade Token Discovery Table

A pixel-perfect, high-performance replica of Axiom Trade's token discovery table built with Next.js 14, TypeScript, and modern web technologies.

## 🚀 Features

- ✨ **Real-time Updates**: Live WebSocket price updates 
- 🎨 **Pixel-Perfect Design**: ≤2px difference from original design
- 📱 **Fully Responsive**: Works flawlessly 
- ♿ **Accessible**: WCAG 2.1 compliant with Radix UI primitives
- 🏗️ **Atomic Architecture**: Clean, reusable component structure

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Data Fetching**: TanStack React Query
- **UI Components**: Radix UI
- **Animations**: Framer Motion + GSAP
- **Virtualization**: react-virtual

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Akshansh0519/axiom-token-table.git
cd axiom-token-table

# Install dependencies
npm install
# or
pnpm install
# or
yarn install

# Run development server
npm run dev
```




## 🌐 Live Deployment

Visit the live application:(https://axiomfrontend-eta.vercel.app/)

## 📁 Project Structure

```
├── app/                      # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── src/
│   ├── components/           # Atomic Design Components
│   │   ├── atoms/           # Basic UI elements
│   │   ├── molecules/       # Composite components
│   │   └── organisms/       # Complex sections
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and helpers
│   ├── services/            # API and WebSocket services
│   ├── store/               # Redux store and slices
│   └── types/               # TypeScript definitions


```

## 🎨 Key Features Implemented

### Real-time Price Updates
- WebSocket mock with deterministic price changes
- 1000ms animation duration with automatic cleanup

### Table Features
- **Sorting**: Click any column header to sort
- **Categories**: Filter by New Pairs, Final Stretch, or Migrated
- **Virtualization**: Smooth scrolling with 100+ tokens

### Interactions
- **Popovers**: Advanced filters
- **Tooltips**: Helpful hints on hover
- **Modal**: Detailed token information
- **Hover Effects**: Smooth row highlighting

### Performance Optimizations
- React.memo for all components
- Virtualized table rendering
- Debounced search
- Optimized re-renders
- Code splitting


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - see LICENSE file for details.

## 👨‍💻 Author

**Akshansh**
- GitHub: [@Akshansh0519](https://github.com/Akshansh0519)
- Email: akshanshranjan007@gmail.com

## 🙏 Acknowledgments

- Design inspiration from [Axiom Trade](https://axiom.trade/pulse)
- Built as part of Eterna Labs Frontend Assignment

---

**Note**: This is a demonstration project showcasing modern React and Next.js development practices.
