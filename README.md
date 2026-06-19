# 7Burgers Website

A modern, mobile-first, dark-themed website for **7Burgers** (315 New Cross Rd, London SE14 6AS), built with plain HTML, CSS and JavaScript — no build step required.

## How to view it

Open `index.html` in any web browser (double-click the file, or right-click → Open with → your browser).

## File structure

```
7Burgers/
├── index.html              ← main page (all sections)
├── assets/
│   ├── css/style.css       ← all styling (colors, layout, animations)
│   ├── js/script.js         ← nav, scroll animations, gallery lightbox
│   └── images/
│       ├── logo-full-trimmed.png   ← full "7Burgers" logo (transparent)
│       ├── logo-badge.png          ← circular bull badge logo
│       ├── hero/            ← hero background photo
│       ├── sections/        ← About / What We Serve / Dine-In photos
│       └── gallery/          ← gallery grid photos
```

## Adding your own photos (no code changes needed)

Every photo on the site is a **placeholder**. As soon as you add a file with the **exact name and path** listed below, it will automatically appear — the dashed "placeholder" box disappears and your photo fills the space.

Recommended size: at least 1200px wide, JPG format, landscape or square depending on the slot.

### Hero background
| File path | Used for |
|---|---|
| `assets/images/hero/hero-background.jpg` | Full-screen hero background |

### Section photos
| File path | Used for |
|---|---|
| `assets/images/sections/about-interior.jpg` | "More Than Just Burgers" about photo |
| `assets/images/sections/serve-burgers.jpg` | American Burgers card |
| `assets/images/sections/serve-hotdogs.jpg` | Hot Dogs card |
| `assets/images/sections/serve-wraps.jpg` | Turkish Wraps card |
| `assets/images/sections/serve-coffee.jpg` | Fresh Coffee card |
| `assets/images/sections/serve-drinks.jpg` | Alcoholic Drinks card |
| `assets/images/sections/dine-seating.jpg` | Dine In & Takeaway (seating photo) |
| `assets/images/sections/dine-front.jpg` | Dine In & Takeaway (storefront photo) |

### Gallery (click any photo to open the lightbox)
| File path | Label |
|---|---|
| `assets/images/gallery/burger-photo.jpg` | Burger Photo |
| `assets/images/gallery/hot-dog-photo.jpg` | Hot Dog Photo |
| `assets/images/gallery/wrap-photo.jpg` | Wrap Photo (tall) |
| `assets/images/gallery/coffee-photo.jpg` | Coffee Photo |
| `assets/images/gallery/interior-photo.jpg` | Interior Photo |
| `assets/images/gallery/seating-area-photo.jpg` | Seating Area Photo |
| `assets/images/gallery/restaurant-front-photo.jpg` | Restaurant Front Photo (wide) |
| `assets/images/gallery/customer-experience-photo.jpg` | Customer Experience Photo |
| `assets/images/gallery/burger-photo-2.jpg` | Burger Photo 2 (tall) |
| `assets/images/gallery/drinks-photo.jpg` | Drinks Photo |

## Things to update later

- **Phone number** — currently a placeholder (`+44 00 0000 0000`) in the Visit Us and Contact sections.
- **Email** — currently a placeholder (`hello@7burgers.co.uk`) in the Contact section.
- **Opening hours** — currently shows "Opening Hours Coming Soon" in the Visit Us section.
- **Social links** — Instagram/Facebook/TikTok icons currently link to `#`; update the `href` attributes in `index.html` (search for `social-links__item`).
- **Full menu** — the "Full Menu Coming Soon" section (`#menu`) is ready to be replaced with a real menu page when you're ready.

## Built with future expansion in mind

- Anchor-based navigation (`#menu`, `#gallery`, etc.) so new pages/sections can slot in easily.
- The "Coming Soon Menu" section is a placeholder for a future full menu page.
- The design system (colors, spacing, fonts) is defined with CSS variables at the top of `assets/css/style.css` — change once, updates everywhere.
- Sections are independent and can be reordered, duplicated, or removed without breaking the layout.

## Brand colors (from the 7Burgers logo)

| Color | Hex |
|---|---|
| Teal (primary) | `#17C0BA` |
| Orange (flame accent) | `#FF8A1E` |
| Background (near-black) | `#0A0A0D` |
| White | `#F7F7F8` |
