# AUR Blockchain Explorer

A comprehensive blockchain explorer similar to Etherscan, built with Next.js 14, TypeScript, and Tailwind CSS. Features a beautiful golden and grey color scheme with modern UI/UX design.

## 🚀 Features

- **Real-time Blockchain Data**: Browse blocks, transactions, addresses, and tokens
- **Advanced Search**: Search by address, transaction hash, block number, or token
- **Responsive Design**: Fully responsive design that works on all devices
- **Modern UI**: Beautiful golden and grey color scheme with smooth animations
- **Comprehensive Pages**: 
  - Homepage with network stats and latest activity
  - Blocks explorer with detailed information
  - Transactions browser with filtering options
  - Tokens listing with market data
  - Address details and transaction history

## 🛠 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts (ready for integration)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AUR-bc
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
AUR-bc/
├── app/
│   ├── components/          # Reusable components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Footer.tsx       # Site footer
│   │   ├── HeroSection.tsx  # Homepage hero
│   │   ├── StatsSection.tsx # Network statistics
│   │   ├── LatestBlocks.tsx # Recent blocks
│   │   ├── LatestTransactions.tsx # Recent transactions
│   │   ├── NetworkStats.tsx # Network overview
│   │   └── TopTokens.tsx    # Token rankings
│   ├── blocks/
│   │   └── page.tsx         # Blocks explorer page
│   ├── txs/
│   │   └── page.tsx         # Transactions page
│   ├── tokens/
│   │   └── page.tsx         # Tokens page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── tailwind.config.js       # Tailwind configuration
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies
```

## 🎨 Design System

### Color Palette

- **Primary Gold**: `#f59e0b` (aur-gold-500)
- **Gold Variants**: 50-900 shades available
- **Grey Scale**: `#6b7280` to `#111827` (aur-grey-500 to aur-grey-900)
- **Status Colors**: Green for success, Red for errors, Yellow for pending

### Typography

- **Font**: Inter (Google Fonts)
- **Weights**: 300-800 available

## 🔧 Customization

### Adding New Pages

1. Create a new folder in `app/` directory
2. Add a `page.tsx` file with your component
3. Update navigation in `Header.tsx` if needed

### Modifying Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  'aur-gold': {
    // Your custom gold shades
  },
  'aur-grey': {
    // Your custom grey shades
  }
}
```

### Adding Real Blockchain Data

Replace mock data in components with real API calls:

1. Add your blockchain API endpoints
2. Create data fetching utilities
3. Update components to use real data
4. Add loading states and error handling

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large Desktop**: 1280px+

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

```bash
npm run build
npm start
```

## 🔮 Future Enhancements

- [ ] Real blockchain API integration
- [ ] Advanced filtering and sorting
- [ ] Charts and analytics
- [ ] Smart contract verification
- [ ] API endpoints
- [ ] User accounts and watchlists
- [ ] Mobile app
- [ ] Dark/Light theme toggle

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for the blockchain community**




