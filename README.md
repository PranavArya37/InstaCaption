# InstaCaption 📸✨

  

InstaCaption is an AI-powered web application that helps you generate engaging Instagram captions for your photos in seconds! Simply upload your image, and let our AI craft the perfect words to accompany your posts.

  

## Features

  

-  **Easy Photo Upload**: Supports PNG, JPG, GIF, and WEBP image formats.

-  **AI-Powered Captions**: Get multiple creative caption suggestions tailored to your image.

-  **One-Click Copy**: Quickly copy your favorite caption to your clipboard.

-  **Responsive Design**: Looks great and works seamlessly on desktops, tablets, and mobile devices.

-  **User-Friendly Interface**: Clean and intuitive design for a smooth experience.

-  **Image Size Validation**: Prevents uploads of images larger than 4MB to ensure optimal performance.

-  **Error Handling**: Clear notifications for any issues during the process.

-  **Dark Mode Support**: Adapts to your system's preferred theme.

  

## Tech Stack

  

-  **Frontend**:

	- [Next.js](https://nextjs.org/) (App Router, Server Components, Server Actions)

	- [React](https://reactjs.org/)

	- [TypeScript](https://www.typescriptlang.org/)

	- [ShadCN UI](https://ui.shadcn.com/) (for UI components)

	- [Tailwind CSS](https://tailwindcss.com/) (for styling)

-  **Backend/AI**:

	- [Genkit (Firebase Genkit)](https://firebase.google.com/docs/genkit) (for AI integration)
	
	- Google Gemini (via Genkit for caption generation)

-  **Development**:

	- Firebase Studio (Development Environment)

  

## Getting Started

  

Follow these steps to get InstaCaption running on your local machine.

  

### Prerequisites

  

- Node.js (v18 or later recommended)

- npm, yarn, or pnpm

  

### Installation & Setup

  

1.  **Clone the repository:**

```bash

git clone https://github.com/PranavArya37/InstaCaption

cd InstaCaption

```

  

2.  **Install dependencies:**

```bash

npm install

# or

# yarn install

# or

# pnpm install

```

  

3.  **Set up environment variables:**

Create a `.env` file in the root of your project and add your Google AI API key. You can obtain one from the [Google AI Studio](https://aistudio.google.com/app/apikey).

```env

GOOGLE_API_KEY=your_google_api_key_here

```

  

4.  **Run the development server:**

The application uses two concurrent development servers: one for the Next.js app and one for Genkit.

  

*  **Start the Next.js development server:**

```bash

npm run dev

```

This will typically start the app on [http://localhost:9002](http://localhost:9002).

  

*  **Start the Genkit development server (in a separate terminal):**

```bash

npm run genkit:dev

# or for auto-reloading on changes

# npm run genkit:watch

```

This will start the Genkit developer UI, usually on [http://localhost:4000](http://localhost:4000), where you can inspect and test your Genkit flows.

  

5.  **Open the app:**

Navigate to [http://localhost:9002](http://localhost:9002) (or the port your Next.js app is running on) in your browser.

  

## Project Structure

  

-  `src/app/`: Contains the Next.js pages and core application logic.

-  `page.tsx`: The main page component for InstaCaption.

-  `actions.ts`: Server actions for handling form submissions and AI calls.

-  `layout.tsx`: The main layout component.

-  `globals.css`: Global styles and ShadCN theme variables.

-  `src/ai/`: Contains Genkit related code.

-  `genkit.ts`: Genkit configuration and initialization.

-  `flows/`: Genkit flows for AI interactions (e.g., `generate-image-caption.ts`).

-  `src/components/`: Shared UI components, including ShadCN UI components.

-  `src/hooks/`: Custom React hooks (e.g., `use-toast.ts`).

-  `src/lib/`: Utility functions.

-  `public/`: Static assets.

  

## Screenshots

  



  

**Upload Section:**



<div  align="center">

<img  src="/screenshots/Screenshot1.jpeg"  alt="InstaCaption Upload Section"  width="70%"  data-ai-hint="app interface">

</div>

  

**Caption Generation Results:**



<div  align="center">

<img  src="/screenshots/Screenshot2.jpeg"  alt="InstaCaption Results"  width="70%"  data-ai-hint="caption results">

</div>

  
  

## Contributing

  

Contributions are welcome! If you have suggestions for improvements or new features, feel free to:

  

1. Fork the Project

2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)

3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)

4. Push to the Branch (`git push origin feature/AmazingFeature`)

5. Open a Pull Request

  

## License

  

This project is licensed under the MIT License. See the `LICENSE` file for details (if one exists, otherwise assume MIT).

  

---

  

Made with ❤️ by [Pranav Arya](https://pranavarya.in) and enhanced with AI in Firebase Studio.
