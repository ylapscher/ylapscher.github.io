# Personal Portfolio & Travel Tracker

A modern, interactive portfolio website built with Next.js that showcases my professional experience, web development projects, hobbies, and travel adventures.

## Features

### 🗺️ Interactive Travel Maps
- World map showing countries visited and lived in
- US map with state-by-state tracking
- Interactive tooltips and hover states
- Dynamic statistics for places visited

### 💼 Project Showcase
- Portfolio of web development projects
- Interactive project cards with hover effects
- Direct links to live websites
- Responsive grid layout for optimal viewing

### 📧 Contact Form Integration
- Floating chat widget for easy contact
- Formspree integration for reliable message delivery
- Form validation and error handling
- Success/error state management

### 🎨 Personal Sections
- Professional experience and skills
- Hobby showcase with custom icons
- Barber portfolio with image gallery
- Reading list integration with Goodreads

### 💻 Technical Highlights
- Built with Next.js (App Router)
- Responsive design with Tailwind CSS
- Dark mode support
- Interactive maps using react-simple-maps
- TypeScript for type safety
- Dynamic data loading and state management
- Formspree integration for email handling

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/ylapscher/ylapscher.github.io.git
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the site

## Project Structure

```
app/
├── components/     # Reusable UI components
├── data/          # Static data files
├── hobbies/       # Hobbies page
├── portfolio/     # Web development portfolio with individual project pages
├── travel/        # Travel tracking features (world + US states maps)
├── services/      # Services page
├── fonts/         # Font files
├── layout.tsx     # Main layout file
├── page.tsx       # Main page content
└── globals.css    # Global styles
public/
└── images/        # Static images (including company logos, profile picture, etc.)
```

## Technologies Used

- **Frontend Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Maps**: react-simple-maps
- **Icons**: Heroicons
- **Forms**: Formspree
- **Analytics**: PostHog
- **Deployment**: GitHub Pages

## Maintenance

### Dependency Checks

To ensure all dependencies are up to date and secure:

```bash
# Check for outdated dependencies
npm outdated

# Check for security vulnerabilities
npm audit

# Update dependencies to their latest versions
npm update
```

### Repository Maintenance

To keep the repository lean, the following files and directories should be ignored (already configured in .gitignore):

- `node_modules/` - NPM dependencies
- `.next/` - Next.js build output
- `out/` - Static export directory
- `.env` - Environment variables
- `.DS_Store` - macOS system files
- `*.log` - Log files
- `coverage/` - Test coverage reports

Regularly clean your local repository:

```bash
# Clean, reproducible install (CI-friendly)
npm ci

# Remove unused build artifacts
npm run clean
```

## Pages

- **Home** (`/`) - Professional experience, skills, and volunteering
- **Portfolio** (`/portfolio`) - Web development portfolio with individual project pages
- **Hobbies** (`/hobbies`) - Personal interests, barber portfolio, and reading list
- **Services** (`/services`) - Professional services and contact information
- **Travel** (`/travel`) - Interactive travel map, toggling between world and US states

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
