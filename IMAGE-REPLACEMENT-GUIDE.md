# Apex Auto Spa image replacement guide

All website images are local files, so the site works on XAMPP and GitHub Pages without an image service. The live page uses optimized `.webp` files; the original generated `.png` files are kept beside them as editable source copies.

## Hero and coating feature

- `images/hero.webp` — main hero background and ceramic-coating feature image.
- Recommended replacement size: at least 1920 × 1200 px, landscape.

## Before / after sliders

Each comparison image is one 2-panel image: BEFORE on the left half and AFTER on the right half. Keep both halves equal in size and perfectly aligned.

- `images/before-after/paint-comparison.webp`
- `images/before-after/headlight-comparison.webp`
- `images/before-after/interior-comparison.webp`
- `images/before-after/ceramic-comparison.webp`
- Recommended replacement size: at least 1600 × 1000 px, landscape, with a 50/50 split.

## Results gallery

- `images/gallery/result-01.webp`
- `images/gallery/result-02.webp`
- `images/gallery/result-03.webp`
- `images/gallery/result-04.webp`
- `images/gallery/result-05.webp`
- `images/gallery/result-06.webp`
- `images/gallery/result-07.webp`
- `images/gallery/result-08.webp`

Gallery images may be portrait or landscape. Use clear, high-resolution client work and update the matching `alt`, `data-caption`, and visible label in `index.html`.

## Important before launch

1. Replace AI-generated placeholder images with the client's real work.
2. Replace the three clearly marked placeholder testimonials with verified reviews.
3. Replace `FROM RM —` and `UP TO X YEARS` with confirmed service details.
4. In `script.js`, replace `601XXXXXXXX` in `WHATSAPP_NUMBER` with the client's number in international format, without `+`, spaces, or dashes.
