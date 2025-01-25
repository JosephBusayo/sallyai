# Sally

Sally is a web application that uses OpenAI API and YouTube API to generate courses for users on any topic. This platform combines AI-generated content with curated YouTube video recommendations to enhance the learning experience.

## Features

- **AI-Generated Courses**: Easily create courses on any topic using OpenAI's API.
- **YouTube Video Recommendations**: Get relevant videos for your course with the YouTube API.

## Live Demo

Visit the live application: [Sally on Netlify](https://sallyai2.netlify.app/)

## Tech Stack

Sally is built using the following frameworks and tools:

- **Next.js**: A React framework for server-side rendering and building web applications.
- **Tailwind CSS**: A utility-first CSS framework for responsive and customizable designs.
- **React Icons**: A rich collection of customizable icons for React.
- **ShadCN UI**: For a modern UI/UX experience.
- **Neon Drizzle**: For database management and querying.

## Environment Variables

To run this project, you will need to set the following environment variables in a `.env` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=

NEXT_PUBLIC_AI_API_KEY=
NEXT_PUBLIC_DB_CONNECTION_STRING=

NEXT_PUBLIC_YOUTUBE_API_KEY=
```
## Setup Instructions

To set up Sally locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd sally
   ```
2. **Install packages**:   
   ```
   npm install
   ```
3. **Start localserver**:
    ```
   npm run dev
   npm run db:studio
   ```

## Future Improvements
    
    Improve performance speed.
    Enhance the UI for a more user-friendly experience.

## Contributors

    JosephBusayo (@JosephBusayo)
    Chaska44 (@Chaska44)
