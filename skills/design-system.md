# Design System - Scandinavian Claymorphism

This guide defines the visual styling tokens and design principles for the EQX site, combining clean Scandinavian minimalism with tactile 3D Claymorphic elements.

## Color Palette (Sleek & Warm Pastels)

- **Canvas Background**: `#F6EFE9` (Warm, soft linen/cream)
- **Panel Background**: `#FCFAF7` (Bright off-white with warm undertone)
- **Primary Accent (Peach)**: `#E29578` (Soft Terracotta/Peach)
- **Secondary Accent (Sage)**: `#83C5BE` (Muted Mint/Sage)
- **Highlight (White)**: `#FFFFFF`
- **Text Primary**: `#2F3E3A` (Deep Forest Olive/Slate for softer contrast)
- **Text Muted**: `#6E7E7A` (Muted Slate)
- **Border/Line**: `rgba(47, 62, 58, 0.08)`

## Claymorphism & 3D Shading (Tactile Neumorphism)

To achieve the "clay" 3D feel from Screenshot B, components should use soft dual-shadows (a light reflection shadow on top-left, and a dark drop shadow on bottom-right).

### Outset Panels
```css
.clay-card {
  background: #FCFAF7;
  border-radius: 24px;
  box-shadow: 
    8px 8px 16px rgba(166, 150, 133, 0.2), 
    -8px -8px 16px #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.6);
}
```

### Inset Active Elements (Buttons, Inputs, Toggle Channels)
```css
.clay-inset {
  background: #F0E6DD;
  box-shadow: 
    inset 4px 4px 8px rgba(166, 150, 133, 0.3), 
    inset -4px -4px 8px #FFFFFF;
  border: 1px solid rgba(47, 62, 58, 0.03);
}
```

## Typography
- **Primary font**: `Plus Jakarta Sans`, sans-serif (sleek, modern geometric proportions).
- **Secondary/Hero font**: `Outfit`, sans-serif (wide, elegant characters for headings).
- **Headings**: Capitalized, spacious tracking, thin to medium weights (`300` - `500`).
