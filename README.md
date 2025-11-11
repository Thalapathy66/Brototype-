# Auth Switch Component Integration

This project demonstrates the integration of a beautiful animated authentication switch component built with React, TypeScript, and Tailwind CSS.

## 📋 Project Structure

The workspace follows the shadcn/ui component structure:

```
/home/tacenta/Documents/try new/
├── components/
│   └── ui/
│       ├── auth-switch.tsx    # Basic component example
│       └── demo.tsx            # Main AuthSwitch component
├── lib/
│   └── utils.ts               # Utility functions (cn helper)
├── src/
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Entry point
│   └── index.css              # Tailwind CSS imports
├── index.html                 # HTML entry
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── tailwind.config.js         # Tailwind CSS config
├── postcss.config.js          # PostCSS config
└── vite.config.ts             # Vite config
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install:
- **React** & **React DOM** - Core React libraries
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **clsx** & **tailwind-merge** - For conditional className merging

### 2. Run Development Server

```bash
npm run dev
```

Open your browser at `http://localhost:5173` (or the port shown in the terminal).

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

## 📦 Component Details

### `demo.tsx` - AuthSwitch Component

The main authentication component featuring:

- ✅ **Animated Sign In/Sign Up Toggle** - Smooth transitions between forms
- ✅ **Responsive Design** - Optimized for desktop, tablet, and mobile
- ✅ **Social Login Icons** - Google, Facebook, Twitter, LinkedIn
- ✅ **Inline Styles** - Self-contained styling (can be moved to Tailwind)
- ✅ **TypeScript Support** - Full type safety
- ✅ **"use client" Directive** - Compatible with Next.js 13+ App Router

**Usage:**

```tsx
import AuthSwitch from "@/components/ui/demo";

function MyPage() {
  return <AuthSwitch />;
}
```

### `auth-switch.tsx` - Simple Component Example

A basic counter component demonstrating the `cn` utility function from shadcn/ui.

**Usage:**

```tsx
import { Component } from "@/components/ui/auth-switch";

function MyPage() {
  return <Component />;
}
```

## 🎨 Styling Approach

The `demo.tsx` component currently uses inline `<style>` tags. For a production app, consider:

1. **Keep inline styles** - Works great for self-contained components
2. **Convert to Tailwind** - Extract styles to Tailwind utility classes
3. **CSS Modules** - Move to a separate `.module.css` file
4. **Styled Components** - Use CSS-in-JS libraries

## 🔧 Why `/components/ui`?

The `/components/ui` folder is important because:

1. **shadcn/ui Convention** - Standard location for shadcn components
2. **Separation of Concerns** - UI primitives separate from feature components
3. **Reusability** - Easy to share components across projects
4. **Import Paths** - Clean imports like `@/components/ui/demo`

If you prefer a different structure, update the `@` alias in `vite.config.ts`:

```ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

And adjust imports accordingly.

## 📚 Setting Up From Scratch

If you need to set up a new project with shadcn/ui:

### Option 1: Using shadcn/ui CLI (Recommended)

```bash
# Create Next.js app with shadcn
npx create-next-app@latest my-app --typescript --tailwind --eslint

# Navigate to project
cd my-app

# Initialize shadcn/ui
npx shadcn-ui@latest init

# Add components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
```

### Option 2: Using Vite (Current Setup)

```bash
# Create Vite + React + TypeScript project
npm create vite@latest my-app -- --template react-ts
cd my-app

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install shadcn dependencies
npm install clsx tailwind-merge

# Create lib/utils.ts with cn function
```

### Option 3: Manual Setup

1. **Install TypeScript**
   ```bash
   npm install -D typescript @types/react @types/react-dom
   ```

2. **Install Tailwind CSS**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. **Configure tsconfig.json** with path aliases
4. **Create lib/utils.ts** with the `cn` helper
5. **Set up component folder structure**

## 🔍 Component Dependencies

The AuthSwitch component requires:

- ✅ **React** (useState, useEffect)
- ✅ **TypeScript**
- ✅ No external icon libraries (uses inline SVGs)
- ✅ No image assets required
- ✅ Self-contained CSS (inline styles)

## 🎯 Integration Checklist

- ✅ TypeScript configured (`tsconfig.json`)
- ✅ Tailwind CSS configured (`tailwind.config.js`)
- ✅ Path aliases configured (`@/` → project root)
- ✅ `lib/utils.ts` created with `cn` helper
- ✅ `/components/ui` folder created
- ✅ Components copied to `/components/ui`
- ✅ Demo app created in `src/App.tsx`
- ✅ All dependencies listed in `package.json`

## 🚨 Next Steps

1. **Install dependencies**: `npm install`
2. **Start dev server**: `npm run dev`
3. **Customize the component** to fit your app's design
4. **Add form validation** (e.g., react-hook-form, zod)
5. **Connect to backend API** for authentication
6. **Add loading states** during form submission
7. **Implement error handling** for failed auth attempts

## 🤝 Contributing

Feel free to:
- Customize the component styles
- Add new authentication methods
- Improve accessibility
- Add animations with Framer Motion

## 📝 License

MIT

---

**Happy coding! 🎉**
