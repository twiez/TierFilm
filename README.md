<!-- PROJECT LOGO -->
<br />
<p align="center">
  <kbd>
  <a href="https://tierfilm.netlify.app/">
    <img src="https://raw.githubusercontent.com/twiez/tierfilm/main/public/vite.svg" alt="Logo" width="250" height="250">
  </kbd>
  </a>

  <h3 align="center">TierFilm App</h3>

  <p align="center">
    Create, share, and compare tier lists for your favorite movies and TV shows.
    <br />
    <br />
    <a href="https://tierfilm.netlify.app/"><strong>View the site</strong></a>
    <br />
    <br />
    <a href="https://github.com/twiez/tierfilm/issues">Report Bug</a>
    ·
    <a href="https://github.com/twiez/tierfilm/issues">Request Feature</a>
    ·
    <a href="https://github.com/twiez/tierfilm/pulls">Send a Pull Request</a>
  </p>
</p>

<!-- ABOUT THE PROJECT -->

## About The Project

This application allows you to create customizable tier lists for your favorite movies and TV shows. You can search for media, drag and drop them into different tiers, and instantly share your list with friends using a unique, URL-encoded link without needing a database. By sharing your link, you can also compare your lists with others to see your compatibility score.

![Screenshot](https://via.placeholder.com/800x450?text=TierFilm+Screenshot)

### Features

- **Create Tier Lists**: Drag-and-drop interface for ranking your favorite media.
- **Share Lists Easily**: Generates a shareable URL containing your tier list without needing a database.
- **Compare functionality**: Compare two different tier lists to find commonalities and view compatibility scores.
- **Export to Image**: Download your tier list as a PNG image.
- **Internationalization**: Support for multiple languages.

### Getting Started

#### Prerequisites

- Node.js (v18 or higher recommended)

#### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/twiez/tierfilm.git
   ```
2. Navigate to the project directory:
   ```bash
   cd tierfilm
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   _Note: Open `.env` and add your `VITE_TMDB_API_KEY` (TMDB API Key)._

5. Start the development server:
   ```bash
   npm run dev
   ```

<!-- SUPPORT -->

## Support

If you found this project helpful, please give it a ⭐️! It helps the project grow and encourages further development.

---

Built with ❤️ by [twiez](https://github.com/twiez)
