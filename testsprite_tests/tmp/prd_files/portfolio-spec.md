# Personal Portfolio Website Specification

## 1. Overview

I want to build a **personal portfolio website** in a cartoon/comic
style.\
The site should highlight: - My personal introduction\
- My portfolio/projects\
- Contact information

The goal is to make it visually unique, creative, and aligned with my
cartoon illustrations.

------------------------------------------------------------------------

## 2. Purpose

-   Showcase my creative works and dashboard projects.\
-   Provide an easy way for people (recruiters, collaborators, or
    clients) to contact me.\
-   Build a professional yet playful online presence with a
    **hand-drawn/cartoon** vibe.

------------------------------------------------------------------------

## 3. Key Features

### 3.1 Navigation

-   A **top navigation bar**, centered horizontally.\
-   Links:
    -   **Home**\
    -   **Profile/About Me**\
    -   **Portfolio / My Work**\
    -   **Contact**

### 3.2 Homepage (Hero Section)

⚠️ **Important Problem Right Now:**\
- My **illustration image and buttons are not centered properly**.\
- On the current site, the cartoon image (girl coding at a desk with
coffee, notebooks, cat, dog) appears **stuck to the left** instead of
being **centered**.\
- The **buttons ("Explore Portfolio" and "Contact Me") also don't align
to the center** on top of the image.

📌 **Expected Behavior:**\
- The hero section should have the image **centered** horizontally.\
- Overlay text (title + subtitle) and buttons should also be
**centered** both horizontally and vertically.

### 3.3 Profile/About Page

-   A section with my **bio/introduction**.\
-   Some text blocks describing my journey, skills, and creative
    approach.

### 3.4 Portfolio/My Work

-   Grid-style showcase of projects:
    -   Example: Dashboard project (with charts, DAU/WAU metrics).\
    -   Cartoon illustrations.\
    -   Each project includes a **title, image, short description**.

### 3.5 Contact Page

-   Clean and centered layout.\
-   Title: *"Contact"*\
-   Placeholder text for now: "Content coming soon!"\
-   Later: add **contact form** (name, email, message).

------------------------------------------------------------------------

## 4. Design Requirements

-   **Style:** Cartoon/hand-drawn, warm, creative.\
-   **Colors:** Neutral background (white/gray), overlay text in
    black/white depending on contrast.\
-   **Typography:** Clean, bold headings + easy-to-read body text.\
-   **Responsive:** Works on desktop and mobile.

------------------------------------------------------------------------

## 5. Technical Requirements

-   Built with **Next.js (v14)** and **TailwindCSS**.\
-   Images stored in `/public/images`.\
-   Use Next.js `<Image />` for optimization.\
-   Navigation and layout handled via `layout.tsx`.

------------------------------------------------------------------------

## 6. Current Issues to Fix (Priority)

1.  Hero section **image is not centered**.\
2.  Hero section **buttons are not aligned to center**.\
3.  Ensure navigation bar is horizontal and centered.

------------------------------------------------------------------------

## 7. Future Enhancements

-   Contact form with backend integration.\
-   Blog section for sharing updates.\
-   Shop/Store page (optional).
