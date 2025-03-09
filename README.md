# สรุปเพลงจะกินไร (Pleng-GinRai)

A Next.js web application with Gemini AI-powered search that helps indecisive couples find restaurants and food options in Thailand. The name "สรุปเพลงจะกินไร" is a play on the common Thai phrase "จะกินไร" (what should we eat?).

## Project Motivation

This project was created to solve the eternal question: "What should we eat today?" 

> "I built this app because I'm tired of the daily struggle of choosing restaurants for my girlfriend. Now, I can just search for a location, and the AI suggests great options for us!" - Developer

## Key Features

- **Location-Based Restaurant Search**: Find restaurants near any location in Thailand (15-20 results)
- **Food Type Exploration**: Discover food options based on cuisine preferences
- **Thai Language Support**: Full Thai language interface with Anuphan font for better readability
- **Two-Stage AI Verification**: Ensures restaurant recommendations actually exist in the specified location
- **Modern UI Design**: 
  - Soft gradients and frosted glass effects
  - Cuisine-specific gradient backgrounds for visual categorization
  - Food emojis based on cuisine type instead of generic images
  - Enhanced address display with Thai language labels
  - Search bar with suggestion pills in Thai

## Restaurant Information Displayed

Each restaurant card shows:
- Restaurant name (in Thai and English when available)
- Rating (with visual star representation)
- Address with enhanced visibility
- Detailed description (bilingual)
- Cuisine type with appropriate food emoji

## Tech Stack

- **Frontend**: Next.js 15.x, React, TypeScript, Tailwind CSS
- **AI**: Google Generative AI (Gemini 2.0 Flash)
- **Styling**: Custom gradient effects, backdrop filters, and responsive design
- **Fonts**: Anuphan (Google Fonts) for Thai language optimization

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Gemini API key (get it from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. Clone the repository:

```bash
git clone https://github.com/leonaruebet/Pleng-GinRai.git
cd Pleng-GinRai
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

## Deployment to Vercel

This application is optimized for deployment on Vercel. Follow these steps to deploy:

1. Create a Vercel account at [vercel.com](https://vercel.com) if you don't have one

2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```

4. Add your Gemini API key as a secret:
   ```bash
   vercel secret add gemini_api_key "your-gemini-api-key"
   ```

5. Deploy the application:
   ```bash
   vercel
   ```

   Or for production deployment:
   ```bash
   vercel --prod
   ```

6. Alternatively, you can connect your GitHub repository to Vercel for automatic deployments:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Configure the project settings
   - Add the environment variable `GEMINI_API_KEY`
   - Deploy

## How It Works

1. **Search Interface**: Enter a location in Thailand (e.g., "อาหารแถวทองหล่อ" or "restaurants near Ekkamai")
2. **AI Processing**: 
   - The Gemini AI generates restaurant recommendations based on the location
   - A verification process confirms that restaurants actually exist in the specified area
   - Only verified restaurants are displayed (or all results if too few are verified)
3. **Results Display**: 
   - Restaurants appear as beautiful cards with cuisine-specific styling
   - Cards can be removed individually to narrow down choices
   - Empty states have friendly messages and visual elements

## Special Features

### Thai Language Optimization
- Thai language interface with proper font support
- Bilingual descriptions (Thai/English) for restaurants and foods
- Thai suggestion pills for common searches

### AI Verification Process
The app uses a two-stage process to ensure quality results:
1. Initial generation of restaurant recommendations
2. Verification of each restaurant's existence in the specified location
3. Filtering to show only verified restaurants (with fallback to show all if too few are verified)

### Modern UI Elements
- Frosted glass effect for cards and search bar
- Gradient backgrounds that change based on cuisine type
- Food emojis instead of generic images for better visual categorization
- Enhanced address display with Thai language label

## Project Structure

- `/src/app`: Main application code
  - `/api`: API routes for backend functionality
    - `/api/gemini`: Endpoint to interact with Gemini AI
  - `/components`: Reusable UI components
    - `/cards`: Card components for displaying restaurants and foods
    - `/chat`: Search interface components
  - `/lib`: Utility functions and helpers
    - `gemini.ts`: Utility functions for interacting with the Gemini API
  - `/types`: TypeScript type definitions

## Usage Tips

- For best results, specify neighborhoods in Bangkok (e.g., "อาหารแถวทองหล่อ", "ร้านอาหารเอกมัย")
- Try searching for specific cuisines (e.g., "อาหารญี่ปุ่นแถวสยาม")
- Use the suggestion pills for quick searches of popular locations
- Remove restaurants you're not interested in to focus on the remaining options

## License

This project is licensed under the MIT License - see the LICENSE file for details.
