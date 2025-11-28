# Tailwind CSS Integration Guide

## ⚠️ Important: Your Current Setup

Your project currently uses:
- Custom CSS classes that look like Tailwind (e.g., `bg-bg-dark`, `text-primary`, `container`)
- A large `styles.css` file with all your custom styles
- Custom CSS variables for colors

## ✅ Safe Integration Strategy

### Step 1: Install Tailwind CSS

```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

### Step 2: Configure Tailwind (tailwind.config.js)

**CRITICAL**: Configure Tailwind to work alongside your existing CSS:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add your custom colors to avoid conflicts
      colors: {
        'gold': '#b59a6d',
        'gold-light': '#bfa37c',
        'gold-dark': '#a38863',
        'bg-dark': '#141414',
        'bg-section': '#f5f5f0',
        'text-dark': '#1a1a1a',
        'text-muted': '#c3c3c3',
        'primary': '#c89b3c',
        'primary-dark': '#a87f2e',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
  // IMPORTANT: Prevent Tailwind from resetting your styles
  corePlugins: {
    preflight: false, // Disable Tailwind's base reset
  },
}
```

### Step 3: Update Your CSS Files

**Option A: Add Tailwind AFTER your existing styles (Recommended)**

In `src/index.css`, add Tailwind directives at the END:

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700&display=swap');

/* Your existing font utilities */
.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.font-playfair {
  font-family: 'Playfair Display', serif;
}

/* ... rest of your existing styles ... */

/* Add Tailwind at the END - this ensures your custom styles take precedence */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Option B: Use a separate Tailwind file (Alternative)**

Create `src/tailwind.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Then import it in `main.tsx` AFTER your other CSS:

```typescript
import './index.css'
import '../styles.css'
import './tailwind.css' // Import Tailwind last
```

### Step 4: CSS Import Order Matters!

The order in `main.tsx` should be:

```typescript
import './index.css'      // Base styles first
import '../styles.css'    // Your custom styles
import './tailwind.css'   // Tailwind last (or add @tailwind directives to index.css)
```

**Why this order?**
- Your custom styles load first
- Tailwind loads last, but with `preflight: false`, it won't reset your styles
- If there are conflicts, your custom CSS (loaded first) will take precedence

## 🎯 Migration Strategy

### Phase 1: Coexistence (Current)
- Keep all your existing CSS
- Use Tailwind for NEW components only
- Gradually replace custom classes with Tailwind utilities

### Phase 2: Gradual Migration
- Replace custom classes one section at a time
- Test thoroughly after each change
- Keep a backup of your `styles.css`

### Phase 3: Full Migration (Optional)
- Once confident, remove unused CSS from `styles.css`
- Use Tailwind for everything

## ⚠️ Common Pitfalls to Avoid

1. **Don't enable preflight** - It will reset your existing styles
2. **Don't remove your existing CSS immediately** - Keep it until migration is complete
3. **Watch for class name conflicts** - Your `container` class might conflict with Tailwind's
4. **Test on all pages** - Make sure nothing breaks

## 🔧 Troubleshooting

### If styles break:
1. Check CSS import order in `main.tsx`
2. Verify `preflight: false` in `tailwind.config.js`
3. Use browser DevTools to see which styles are being applied
4. Add `!important` to critical custom styles if needed

### If Tailwind classes don't work:
1. Check `content` paths in `tailwind.config.js`
2. Restart your dev server
3. Clear browser cache
4. Verify PostCSS is configured correctly

## 📝 Recommended Next Steps

1. ✅ Install Tailwind with the config above
2. ✅ Test that your existing design still works
3. ✅ Try adding a new component with Tailwind classes
4. ✅ Gradually migrate one section at a time
5. ✅ Remove unused CSS as you migrate

## 🎨 Using Both Together

You can use both your custom classes AND Tailwind:

```jsx
// Your existing custom classes still work
<div className="bg-bg-dark text-white">

// You can also use Tailwind now
<div className="bg-gray-800 text-white p-4 rounded-lg">

// Or mix them (custom + Tailwind)
<div className="bg-bg-dark text-white p-4 rounded-lg shadow-xl">
```

