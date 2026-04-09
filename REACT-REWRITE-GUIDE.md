# React Rewrite - Visual Editing Guide

## What is react-rewrite?

react-rewrite lets you edit your React app visually while it's running locally, then automatically writes those changes back to your source files. Perfect for tweaking Tailwind classes, adjusting layouts, and editing text without touching code.

## Quick Start

1. **Start your dev server** (in one terminal):
   ```bash
   npm run dev
   ```

2. **Start react-rewrite** (in a second terminal):
   ```bash
   npm run rewrite
   ```

   Or run directly without the script:
   ```bash
   npx react-rewrite-cli
   ```

3. **Your browser will open** with the editing overlay active on `http://localhost:3001` (proxy to your dev server)

## What You Can Do

### Visual Editing
- **Select elements**: Click any element to inspect its component, file path, and line number
- **Edit Tailwind properties**: Use the sidebar to modify layout, spacing, size, typography, and colors
- **Edit text inline**: Double-click any text to edit it directly
- **Copy/Paste**: `Ctrl/Cmd + C` to copy, `Ctrl/Cmd + V` to paste as sibling
- **Duplicate**: `Ctrl/Cmd + D` to duplicate an element
- **Delete**: `Delete` or `Backspace` to remove elements
- **Reorder**: Drag elements to reorder siblings
- **Undo**: `Ctrl/Cmd + Z` to undo canvas changes
- **View changelog**: `Ctrl/Cmd + Shift + L` to see applied changes

### Workflow
1. Click an element to select it
2. Make changes in the sidebar or double-click text
3. Review pending changes in the UI
4. Click **Confirm** to write changes to your source files
5. Your dev server will hot-reload with the changes

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + C` | Copy selected element |
| `Ctrl/Cmd + V` | Paste as sibling |
| `Ctrl/Cmd + D` | Duplicate element |
| `Delete/Backspace` | Remove element |
| `Ctrl/Cmd + Z` | Undo canvas changes |
| `Ctrl/Cmd + Shift + L` | Toggle changelog |
| `Ctrl/Cmd + Click` | Follow links through overlay |
| `Double-click text` | Edit text inline |

## Perfect For Your Project

Your e-commerce site is ideal for react-rewrite because:

✅ **Tailwind CSS** - All your components use Tailwind utilities  
✅ **Component-based** - Clean React components in `app/` and `components/`  
✅ **TypeScript** - Strong typing for safe edits  
✅ **Next.js App Router** - Fully supported  

## Great Use Cases

### Product Cards (`app/shop/components/product-card/`)
- Adjust spacing, padding, and layout
- Tweak hover effects and transitions
- Edit product card text and labels
- Reorder elements in the card overlay

### Shop Filters (`app/shop/components/shop-filters.tsx`)
- Modify filter layout and spacing
- Edit filter labels and text
- Adjust mobile/desktop breakpoints

### Product Pages (`app/product/[handle]/page.tsx`)
- Edit product title and description styling
- Adjust gallery layout and spacing
- Modify variant selector appearance
- Tweak breadcrumb styling

### Layout Components (`components/layout/`)
- Adjust header spacing and alignment
- Modify navigation styles
- Edit footer content and layout

## Tips

- **Start small**: Try editing a single component first to get comfortable
- **Use the inspector**: Click elements to see which file they come from
- **Review before confirming**: Check the pending changes list before applying
- **Undo is your friend**: `Ctrl/Cmd + Z` works for canvas changes
- **Check the changelog**: See all applied changes with `Ctrl/Cmd + Shift + L`

## Troubleshooting

**Port conflict?**
```bash
npx react-rewrite-cli 3000
```
Specify your dev server port explicitly.

**Don't want auto-open?**
```bash
npx react-rewrite-cli --no-open
```

**Need debug logs?**
```bash
npx react-rewrite-cli --verbose
```

## Important Notes

- Only works in **development mode** (not production builds)
- Only edits files **inside your project** (safe by default)
- Run from your **project root** for proper file detection
- Changes are written to your **source files** - commit to git regularly!

## Demo Video

Watch the full demo: https://youtu.be/APl0_v5CRnI

---

Now go make your e-commerce site look amazing! 🎨
