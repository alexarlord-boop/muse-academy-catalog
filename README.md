# Music Album Catalog

A responsive web application built with React.js that serves as a catalog for music albums. The application includes user authentication, album management, and search functionalities, with distinct roles for editors and visitors. Backend functionality is managed using a BaaS service like Supabase.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Usage](#usage)
4. [Environment Variables](#environment-variables)
5. [Screenshots](#screenshots)
6. [Contact](#contact)

## Features

- **User Authentication**: Supports login and registration with role-based access (editor and visitor).
- **Album Catalog**: Paginated list of music albums with search and filter functionality.
- **Album Details Page**: View detailed information about a music album.
- **Album Management**: Editors can add, edit, or delete albums.
- **Favorites**: Users can add albums to a favorites list and view them on a dedicated page.
- **Dark Theme Support**: Toggle between light and dark themes.
- **Responsive Design**: Optimized for all devices, ensuring a seamless user experience.

## Tech Stack

- **Frontend**: React.js, React Router, Context API
- **Backend**: Supabase (BaaS)
- **Styling**: Tailwind CSS / Material UI (choose based on your styling approach)
- **Deployment**: AWS Amplify

## Usage

### Authentication

- Register as a new user or log in with an existing account.
- Upon successful login, users can navigate to different sections of the app based on their role.

### Album Catalog

- The catalog page displays a list of music albums with pagination.
- Use the search bar and filters to narrow down the list of albums.

### Album Management (Editor Role)

- Editors can add new albums using the "Add Album" button.
- To edit or delete an album, navigate to the album's details page and use the provided options.

### Favorites

- Add albums to the favorites list by clicking the heart icon on the album cards.
- View your favorites on the dedicated "Favorites" page.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

- `REACT_APP_SUPABASE_URL`: The URL of your Supabase project.
- `REACT_APP_SUPABASE_ANON_KEY`: The anonymous public API key for your Supabase project.

## Screenshots

Here are some screenshots of the application:

- **Home Page**: ![Home Page](screenshots/home-page.png)
- **Album Details**: ![Album Details](screenshots/album-details.png)
- **Favorites Page**: ![Favorites Page](screenshots/favorites-page.png)
- **Dark Mode**: ![Dark Mode](screenshots/dark-mode.png)

*(Add screenshots of your application to the `screenshots` folder and reference them here)*


## Contact

Your Name - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/music-album-catalog](https://github.com/yourusername/music-album-catalog)
