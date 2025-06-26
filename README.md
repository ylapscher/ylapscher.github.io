# Personal Portfolio & Travel Tracker

A modern, interactive portfolio website built with Next.js that showcases my professional experience, hobbies, and travel adventures.

## Features

### 🗺️ Interactive Travel Maps
- World map showing countries visited and lived in
- US map with state-by-state tracking
- Interactive tooltips and hover states
- Dynamic statistics for places visited

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
- Dark mode
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
├── travel/        # Travel tracking features
├── us-travel/     # US states map
├── services/      # Services page
├── fonts/         # Font files
├── layout.tsx     # Main layout file
├── page.tsx       # Main page content
└── globals.css    # Global styles
public/
└── images/        # Static images (including company logos, profile picture, etc.)
```

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- React Simple Maps
- Hero Icons
- Formspree
- GitHub Pages (Deployment)

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
# Remove development dependencies and cache
npm clean-install

# Remove unused build artifacts
npm run clean
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
