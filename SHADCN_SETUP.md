# Shadcn UI & Tailwind CSS Setup Instructions

Currently, the project uses Tailwind CSS via CDN and does not have the full shadcn/ui infrastructure configured. To fully support shadcn/ui and local Tailwind CSS building (recommended for production), follow these steps:

## 1. Install Tailwind CSS

Remove the CDN link from `index.html` and install Tailwind as a dev dependency:

```bash
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 2. Configure Tailwind

Update `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}", // Ensure all component paths are included
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace'],
      },
    },
  },
  plugins: [],
}
```

## 3. Add Tailwind Directives

Create `src/index.css` (or equivalent) and add:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Import this CSS file in your root `index.tsx`.

## 4. Initialize Shadcn UI

Run the shadcn init command:

```bash
pnpm dlx shadcn@latest init
```

Follow the prompts. Since we already created `lib/utils.ts` and `components/ui`, you might need to adjust paths or let it overwrite standard configs.

## 5. Add Components

You can now add components via CLI:

```bash
pnpm dlx shadcn@latest add button
```
