# Restaurant & Food Finder

A Next.js web application with a Gemini AI-powered chatbot that helps users find restaurants and food types based on location.

## Features

- User can input a location to get a list of nearby restaurants (15-20 results)
- User can specify a type of food to get a list of food options (15-20 results)
- Results are displayed as cards that users can remove one by one
- Powered by Gemini AI API for intelligent responses

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **API**: Google Generative AI (Gemini)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Gemini API key (get it from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd restaurant-food-finder
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.local.example .env.local
```

4. Edit `.env.local` and add your Gemini API key:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```bash
npm run build
# or
yarn build
```

### Run Production Build

```bash
npm start
# or
yarn start
```

## Usage

1. Enter a location (e.g., "restaurants in New York") to find nearby restaurants
2. Enter a food type (e.g., "Italian food") to discover food options
3. View the results as cards
4. Remove cards you're not interested in by clicking the X button

## Project Structure

- `/src/app`: Main application code
  - `/api`: API routes for backend functionality
    - `/api/gemini`: Endpoint to interact with Gemini AI
  - `/components`: Reusable UI components
    - `/ui`: Basic UI components
    - `/cards`: Card components for displaying restaurants and foods
    - `/chat`: Chatbot related components
  - `/lib`: Utility functions and helpers
  - `/types`: TypeScript type definitions
  - `/assets`: Project assets

## License

This project is licensed under the MIT License - see the LICENSE file for details.
# Pleng-GinRai
# Pleng-GinRai
