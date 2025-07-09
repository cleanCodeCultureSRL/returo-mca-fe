# RetuRO Romania - PWA Mobile App

A Progressive Web App for RetuRO Romania's return and recycling system.

## 🚀 Features

- 📱 **Progressive Web App** - Installable on mobile devices
- ⚡ **Fast & Responsive** - Optimized for mobile performance
- 🎨 **Modern UI** - Clean, intuitive design with Tailwind CSS
- 🇷🇴 **Romania-focused** - Designed specifically for Romanian users
- ♻️ **Eco-friendly** - Promoting recycling and environmental sustainability

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **next-pwa** - PWA integration for Next.js
- **Vercel** - Deployment platform

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd returo-mobile-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📱 PWA Testing

### Desktop Browser Testing

1. Open Chrome DevTools (F12)
2. Go to Application tab
3. Check "Service Workers" and "Manifest" sections
4. Look for install prompt in address bar

### Mobile Testing

1. Open the app on mobile browser
2. Look for "Add to Home Screen" option
3. Install and test offline functionality

## 🚀 Deployment to Vercel

### Automatic Deployment (Recommended)

1. **Push to GitHub:**

   ```bash
   git add .
   git commit -m "Initial RetuRO PWA setup"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Import the project
   - Deploy automatically

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 📁 Project Structure

```
returo-mobile-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── SplashScreen.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
├── public/
│   ├── icons/
│   └── manifest.json
├── next.config.js
└── vercel.json
```

## 🎯 Next Steps

### Phase 1: Core Features (Current)

- [x] PWA Setup
- [x] Splash Screen
- [x] Basic Home Screen
- [ ] User Authentication
- [ ] Location Services

### Phase 2: Return System

- [ ] QR Code Scanner
- [ ] Item Recognition
- [ ] Return Process Flow
- [ ] Collection Point Finder

### Phase 3: Rewards & Gamification

- [ ] Points System
- [ ] Rewards Catalog
- [ ] Achievement System
- [ ] Social Features

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### PWA Configuration

PWA settings are configured in:

- `next.config.js` - PWA plugin configuration
- `public/manifest.json` - App manifest
- `src/app/layout.tsx` - Meta tags and icons

## 📊 Performance

- **Lighthouse Score Target:** 90+ on all metrics
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **PWA Compliant:** ✅

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please contact the development team or create an issue in the repository.
