# Recipe Management

This is a recipe management application that allows users to create, view, and manage their recipes. With this app, users can easily organize their favorite recipes, add new ones, and search for specific recipes based on various criteria.

#### Note:

it is important to mention that due to the limitations of the specific backend I was working with, **I couldn't make a GET request for a single user directly**. Therefore, I had to retrieve all users and apply specific criteria to find the required user. I understand that this approach is not acceptable in real-world projects, but I had no other option given the constraints of the backend I was working with.

## Technologies Used

React: A JavaScript library for building user interfaces.
TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
Redux Toolkit: An opinionated state management library for efficient and scalable Redux development.
React Router v6: A declarative routing library for React applications.
Auth0: A flexible authentication and authorization platform.
React Hook Form: A library for building forms with React hooks.
Tailwind: A utility-first CSS framework for quickly building custom user interfaces.
Ant Design: A popular UI library for React that provides pre-designed components and styles.

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js: [https://nodejs.org](https://nodejs.org)

### Installation

1. Clone the repository: git clone https://github.com/olexanax/Recipe-menegment-test.git
2. Navigate to the project directory: cd recipe-management
3. Install the dependencies: npm install
4. Start the development server: npm start
5. Open your browser and access the app at http://localhost:3000

#### Note:

It is crucial to open the project on port 3000, as the authentication process will redirect you to this specific port after successful authorization. Make sure to access the application using http://localhost:3000 to ensure the proper functioning of the authentication flow.

## Project Structure

public/ directory in a React project contains the static assets and files that are served as-is to the client without any processing or transformations.
index.html: This is the main HTML file that serves as the entry point for your React application.

src/ directory is the main source directory of project
components/: This directory contains reusable UI components used throughout the application.
pages/: This subdirectory contains components specific to different pages of the application
hooks/: This directory houses custom hooks that provide reusable functionality across components, such as fetching data or handling authentication.
interfaces/: This directory is for defining TypeScript interfaces or types that define the shape of data used in the application, such as Recipe and User.
selectors/: This directory contains selector functions, which are used to extract specific data from the Redux store.
slices/: This directory is where you can define Redux Toolkit slices, which contain the actions and reducers for managing state in your application.
store/: This directory holds the Redux store configuration, including the root reducer and any middleware or enhancers.
utils/: This directory is for utility functions or helper modules that can be used across the application.
index.tsx: This is the entry point of your application, where you typically render the root component and mount it in the DOM.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

Fork the repository
Create a new branch for your feature or bug fix
Commit your changes
Push the branch to your forked repository
Submit a pull request explaining your changes

## License

This project is licensed under the MIT License.

## Acknowledgements

Special thanks to the contributors and maintainers of the open-source libraries used in this project. Their hard work and dedication make projects like this possible.

## Contact

If you have any questions, suggestions, or feedback, please feel free to reach out to us at sylkoalex@gmail.com. We'd love to hear from you!

Thank you for using Recipe Management
