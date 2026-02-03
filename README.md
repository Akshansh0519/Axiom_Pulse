# 🚀 Axiom Pulse - Token Discovery Dashboard

A real-time cryptocurrency token discovery and trading platform built with Next.js 16, featuring enterprise-grade SSO authentication.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-v5-purple)

- ✨ **Real-time Updates**: Live WebSocket price updates 
- 🎨 **Pixel-Perfect Design**: ≤2px difference from original design
- 📱 **Fully Responsive**: Works flawlessly 
- ♿ **Accessible**: WCAG 2.1 compliant with Radix UI primitives
- 🏗️ **Atomic Architecture**: Clean, reusable component structure

## ✨ Features


- **📊 Real-time Token Dashboard** - Live cryptocurrency data with <100ms latency
- **🔐 SSO Authentication** - Single Sign-On with Google and GitHub OAuth
- **🎨 Modern UI** - Built with Radix UI and Tailwind CSS
- **⚡ High Performance** - Lighthouse score > 90
- **🔄 CI/CD Pipeline** - Automated testing and deployment with GitHub Actions

## 🔐 Authentication

This application implements **enterprise-grade SSO (Single Sign-On)** using NextAuth.js v5:

| Provider | Protocol | Use Case |
|----------|----------|----------|
| Google | OAuth 2.0 | Consumer/Enterprise SSO |
| GitHub | OAuth 2.0 | Developer authentication |

### Why SSO?

- **Security**: No passwords stored, leverages trusted identity providers
- **UX**: One-click sign-in, no registration forms
- **Enterprise-ready**: Same patterns used by Okta, Auth0, Azure AD




## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- GitHub OAuth App credentials
- Google OAuth App credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Akshansh0519/Axiom_Pulse.git
   cd Axiom_Pulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure OAuth credentials** in `.env.local`:
   ```env
   AUTH_SECRET=your-32-char-secret
   AUTH_GITHUB_ID=your-github-client-id
   AUTH_GITHUB_SECRET=your-github-client-secret
   AUTH_GOOGLE_ID=your-google-client-id
   AUTH_GOOGLE_SECRET=your-google-client-secret
   NEXTAUTH_URL=http://localhost:3000
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open** [http://localhost:3000](http://localhost:3000)

## 🔧 OAuth Setup Guide

Visit the live application:(https://axiomfrontend-eta.vercel.app/)

### GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: Axiom Pulse
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`

### Google OAuth App

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create OAuth 2.0 Client ID
3. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
 ddda49c (feat: add SSO authentication with Google and GitHub OAuth)

## 📁 Project Structure

```
├── app/
│   ├── api/auth/[...nextauth]/   # Auth API routes
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Protected home page
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
│   ├── components/
│   │   ├── atoms/                 # AuthButton, UserAvatar
│   │   ├── molecules/             # TableSkeleton, etc.
│   │   └── organisms/             # TopNav, LoginCard, TokenTable
│   ├── lib/
│   │   └── auth.ts                # NextAuth configuration
│   ├── hooks/                     # Custom React hooks
│   ├── services/                  # API services
│   ├── store/                     # Redux store
│   └── types/                     # TypeScript types
└── .github/
    └── workflows/
        └── ci.yml                 # CI/CD pipeline

```

## 🔄 CI/CD Pipeline


### Real-time Price Updates
- WebSocket mock with deterministic price changes
- 1000ms animation duration with automatic cleanup

### Table Features
- **Sorting**: Click any column header to sort
- **Categories**: Filter by New Pairs, Final Stretch, or Migrated
- **Virtualization**: Smooth scrolling with 100+ tokens

The GitHub Actions workflow includes:

- ✅ ESLint code quality checks
- ✅ TypeScript type checking
- ✅ Security vulnerability audit
- ✅ Production build verification
- ✅ Automated Vercel deployment
(feat: add SSO authentication with Google and GitHub OAuth)

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | Radix UI |
| State Management | Redux Toolkit + React Query |
| Authentication | NextAuth.js v5 (Auth.js) |
| Deployment | Vercel |
| CI/CD | GitHub Actions |



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

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with ❤️ by [Akshansh](https://github.com/Akshansh0519)
(feat: add SSO authentication with Google and GitHub OAuth)
