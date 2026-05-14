# Portfolio Design System

## Overview
Your portfolio now has a unified, professional design system. All sections follow consistent patterns for layout, spacing, typography, and colors.

## Quick Content Updates

### Where to Edit Content
All content is centralized in **`src/data/sections.ts`**. Edit this file to update any text, headlines, or descriptions across your portfolio.

### How to Update Content

#### Hero Section
```typescript
// File: src/data/sections.ts
hero: {
  headline: 'Building products that solve real problems', // Main headline
  highlightWord: 'solve', // This word appears in blue
  tagline: 'Your tagline here',
  // ...
}
```

#### Contact Section
```typescript
contact: {
  headline: 'Let\'s ship it.',
  highlightWord: 'ship', // This word appears in blue
  // ...
}
```

#### All Other Sections
Each section has its own object in `sections.ts`:
- `about` - About section content
- `services` - What you do section
- `projects` - Projects section header
- `why` - Why work with me section
- `tools` - Tools & stack section
- `contact` - Contact form and info

## Design System Consistency

### Section Numbers
All sections now have consistent numbering:
- S 01 - Intro/Hero
- S 02 - About
- S 03 - Services
- S 04 - Work/Projects
- S 05 - Why Work With Me
- S 06 - Tools/Stack
- S 07 - Contact

### Container Widths
All sections use consistent max-widths defined in `designSystem`:
- `max-w-7xl` - Most sections (default)
- `max-w-6xl` - Hero section (narrow)
- `max-w-3xl` - Text-only sections like About (text)

### Spacing
- Vertical padding: `py-20 md:py-24`
- Horizontal padding: `px-4`

### Typography
- Section numbers: Small, uppercase, monospace, blue
- Section labels: Small, uppercase, monospace, gray
- Headlines: Large, normal weight, high contrast
- Body text: Base size, medium contrast

### Buttons
- **Removed all terminal-style symbols** (no more $ signs)
- Clean, simple text: "View projects", "Work with me", "submit --inquiry"
- Consistent sizing and monospace font

### Colors
- Primary (blue): Used for highlights and accents
- Foreground: Main text color
- Muted foreground: Secondary text
- Border: Subtle dividers

### Borders & Cards
- Border radius: `rounded-sm` (consistent across all cards)
- Border color: `border-border/60`
- Card background: `bg-card/40`

## File Structure

```
src/
├── data/
│   ├── sections.ts          ← EDIT THIS for all content
│   ├── profile.ts           ← Personal info (name, email, socials)
│   └── skills.ts            ← Skills data
├── components/
│   └── sections/
│       ├── HeroSection.tsx
│       ├── BubbleFocusSections.tsx
│       ├── ProjectsSection.tsx
│       └── ContactSection.tsx
```

## Making Changes

### To Change Text Content
1. Open `src/data/sections.ts`
2. Find the section you want to edit
3. Update the text
4. Save - changes appear immediately in dev mode

### To Change Highlighted Words
In `sections.ts`, update the `highlightWord` field:
```typescript
hero: {
  headline: 'Building products that solve real problems',
  highlightWord: 'solve', // ← Change this to highlight a different word
}
```

### To Change Design System Values
In `sections.ts`, edit the `designSystem` object:
```typescript
export const designSystem = {
  maxWidth: {
    default: 'max-w-7xl', // ← Change container widths
  },
  sectionPadding: {
    y: 'py-20 md:py-24', // ← Change vertical spacing
  },
  highlightColor: 'text-primary', // ← Change highlight color
}
```

## What Was Fixed

### Consistency Issues Resolved
✅ All sections now have consistent numbering (S 01, S 02, etc.)
✅ All sections use the same max-width container (max-w-7xl)
✅ Removed inconsistent "$" symbols from buttons
✅ Unified border radius (rounded-sm everywhere)
✅ Consistent section headers with horizontal lines
✅ Unified typography (normal font weight for headlines)
✅ Consistent spacing between sections

### Hero Section Improvements
✅ Shortened headline: "Building products that **solve** real problems"
✅ Reduced wordiness - removed extra description
✅ Added blue highlight to key word ("solve")
✅ Cleaner, more professional appearance

### Form Improvements
✅ Removed terminal "$" symbols from submit button
✅ Clean button text: "submit --inquiry" (no $)
✅ Shorter form height with better spacing

### Footer
✅ Minimalist design
✅ Auto-generating version number
✅ Professional, clean layout

## Tips

1. **Test in dev mode**: Run `npm run dev` to see changes immediately
2. **Keep it simple**: The design is intentionally minimal - stick to the established patterns
3. **Use the data file**: Always edit `sections.ts` instead of editing components directly
4. **Consistent highlighting**: Only highlight 1-2 words per headline for maximum impact
5. **Professional tone**: Keep button text clean and terminal-style without excessive symbols

## Need to Revert?
All changes are tracked in git. You can see what was changed with:
```bash
git diff
```

Or revert specific files if needed.
