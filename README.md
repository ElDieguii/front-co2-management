# EnExpert

**EnExpert** is an application designed to manage emissions and improve energy efficiency. The platform helps businesses track and reduce their environmental impact, focusing on emission scopes and energy use. The current version is `1.6.0` and includes features like task management, user management, and supplier tracking.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Technologies](#technologies)
- [Version History](#version-history)
- [Contributing](#contributing)
- [License](#license)

## Overview

EnExpert is designed to help companies monitor and manage their energy use and emissions. The platform provides real-time tracking, user management, and various tools for efficient energy usage, enabling companies to minimize their environmental footprint.

## Features

- **User Registration & Authentication**: Manage multiple user roles and profiles.
- **Task Management**: Assign and manage energy-related tasks.
- **Scope 1 & Scope 2 Emission Tracking**: Measure and report on different emission scopes.
- **Scope 3 Emission Tracking**: New feature for expanded emission tracking.
- **Supplier Management**: Track and manage suppliers related to energy and emissions.
- **Dashboard**: Visual representation of energy usage and emission data.
- **Measurement Tools**: Integrated tools to measure energy efficiency and emissions.
- **Advanced Calculations**: For more in-depth analysis of emissions and energy use.
- **Sidebar and Header UI**: Improved navigation with sidebar and header elements.

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/ElDieguii/co2-management-front
   ```

2. Navigate to the project directory:

   ```bash
   cd enexpert
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Running the Application

EnExpert is now using **Vite** for a faster and more optimized development experience.

- **Development Mode**:

  ```bash
  npm run dev
  ```

  This will open the app at `http://localhost:5173`. The app will automatically reload if you make edits to the code, taking advantage of Vite's fast HMR (Hot Module Replacement).

- **Production Build**:

  To create an optimized production build:

  ```bash
  npm run build
  ```

  This will create the production files in the `dist` folder .

- **Preview Production Build**:

  To preview the production build locally:

  ```bash
  npm run preview
  ```

  This will serve the build at `http://localhost:5000` for you to test.

## Technologies

This project uses the following technologies:

- **Frontend**:
  - React.js (now built with Vite for faster development)
  - HTML5, CSS3, JavaScript (ES6+)
- **Backend**:
  - Node.js with Express.js
  - MongoDB for database management
- **Deployment**:
  - Deployed with (Heroku and Vercel)

## Version History

### Version 1.6.0

- Added Sidebar and Header UI for better navigation.

### Version 1.5.0

- Implemented Scope 3 Emission Tracking for expanded coverage.

### Version 1.4.0

- Introduced Advanced Calculation features.

### Version 1.3.0

- Added Register Form for user sign-up.

### Version 1.2.0

- Introduced Task Management system.

### Version 1.1.0

- Implemented User Management functionality.

### Version 1.0.0

- Initial version with:
  - Scope 1 and Scope 2 emission tracking
  - User profile management
  - Supplier management
  - Dashboard
  - Measurement tools

## Contributing

We welcome contributions to the project! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch with a descriptive name:

   ```bash
   git checkout -b feature/new-feature
   ```

3. Make your changes and commit them:

   ```bash
   git commit -m "Added new feature"
   ```

4. Push to your forked repository:

   ```bash
   git push origin feature/new-feature
   ```

5. Open a Pull Request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
