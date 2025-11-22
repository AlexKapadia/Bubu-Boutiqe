# BuBu Boutique - Shopify Theme

A high-end, Awwwards-level Shopify theme for BuBu Boutique, featuring exclusive Labubu collectibles with a light, pastel purple aesthetic.

## 🎨 Design Features

- **Light Pastel Purple Aesthetic**: Soft lavender, periwinkle, and pale purple tones
- **Modern Premium Design**: Clean layouts with glassmorphism effects
- **Smooth Animations**: GSAP parallax, marquee tickers, 3D card effects
- **Fully Responsive**: Mobile-first design that works on all devices

## 📁 Theme Structure

```
├── assets/
│   ├── theme.css          # Main stylesheet with pastel purple theme
│   └── theme.js           # Cart functionality and interactions
├── config/
│   └── settings_schema.json  # Theme customization settings
├── layout/
│   └── theme.liquid       # Base layout template
├── sections/
│   ├── header.liquid      # Site header with navigation
│   ├── hero.liquid        # Hero section with animations
│   ├── product-carousel.liquid  # Product carousel section
│   ├── rarity-chart.liquid      # Rarity visualization
│   └── footer.liquid      # Site footer
├── snippets/
│   ├── cart-drawer.liquid # Shopping cart drawer
│   ├── product-card.liquid     # Product card component
│   └── meta-tags.liquid   # Meta tags snippet
└── templates/
    ├── index.liquid       # Homepage template
    ├── product.liquid     # Product detail page
    ├── collection.liquid  # Collection/Shop page
    ├── page.about.liquid  # About page
    └── page.contact.liquid # Contact page
```

## 🚀 Installation

1. **Upload to Shopify:**
   - Go to Shopify Admin → Online Store → Themes
   - Click "Add theme" → "Upload zip file"
   - Zip this entire theme folder and upload

2. **Or Connect via GitHub:**
   - Go to Shopify Admin → Online Store → Themes
   - Click "Add theme" → "Connect from GitHub"
   - Connect your repository

## ⚙️ Theme Settings

Customize the theme through Shopify Admin:
- **Colors**: Primary, secondary, accent, background, and text colors
- **Header**: Logo text or image upload
- **Social Media**: Instagram, Twitter, Facebook links
- **Hero Section**: Customizable heading, subtitle, and button
- **Collections**: Select which collection to display

## 🎨 Color Palette

- **Primary Purple**: `#b19cd9` (Soft Lavender)
- **Secondary Purple**: `#c5b3e6` (Periwinkle)
- **Accent Purple**: `#e6d3f5` (Pale Purple)
- **Background**: `#f5f0ff` (Light Purple Tint)
- **Text**: `#2d2d3a` (Soft Dark Gray)

## 📦 Features

- ✅ Shopify Cart API integration
- ✅ Product variant handling
- ✅ Collection filtering
- ✅ Responsive design
- ✅ GSAP animations
- ✅ Drag-scroll carousel
- ✅ Rarity chart visualization
- ✅ Contact form integration
- ✅ SEO optimized

## 🔧 Customization

### Adding Rarity to Products

Add a metafield to products:
1. Go to Settings → Custom data → Products
2. Create a metafield named `rarity` (type: single line text)
3. Values: "Rare", "Super Rare", or "Secret"

### Menu Setup

1. Go to Navigation in Shopify Admin
2. Create a menu named "Main menu"
3. Add your navigation links

### Footer Links

1. Go to Navigation in Shopify Admin
2. Create a menu named "Footer"
3. Add footer links

## 📝 License

All rights reserved - BuBu Boutique
