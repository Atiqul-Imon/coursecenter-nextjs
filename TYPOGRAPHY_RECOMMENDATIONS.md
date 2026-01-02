# Typography Recommendations for Course Centre

## Design Goals
- ✅ **Student-Friendly**: Modern, approachable, not intimidating
- ✅ **Enterprise-Grade**: Professional, trustworthy, sophisticated
- ✅ **Top-Notch**: Premium feel, high-quality appearance

---

## Recommended Option 1: Inter + Plus Jakarta Sans (RECOMMENDED ⭐)

### Why This Works:
- **Inter**: Clean, modern, highly readable - perfect for body text
- **Plus Jakarta Sans**: Friendly, approachable, yet professional - perfect for headings
- **Combination**: Balances student appeal with enterprise credibility
- **Usage**: Used by modern tech companies and educational platforms

### Font Pairing:
- **Headings**: Plus Jakarta Sans (Display font)
- **Body Text**: Inter (Sans-serif)
- **Accents**: Inter (for buttons, labels)

### Characteristics:
- ✅ Modern and approachable
- ✅ Professional without being stuffy
- ✅ Excellent readability
- ✅ Great for digital screens
- ✅ Supports multiple weights (200-800)

### Use Cases:
- **Plus Jakarta Sans**: Hero headings, section titles, card titles, CTA buttons
- **Inter**: Body text, descriptions, form labels, navigation

---

## Recommended Option 2: Inter + Outfit

### Why This Works:
- **Inter**: Proven body font
- **Outfit**: Geometric, modern, friendly - appeals to younger audience
- **Combination**: Very modern, tech-forward feel

### Characteristics:
- ✅ Very modern and trendy
- ✅ Geometric and clean
- ✅ Appeals to Gen Z and Millennials
- ✅ Professional but approachable

### Best For:
- Tech-savvy student audience
- Modern, cutting-edge brand image
- Digital-first platforms

---

## Recommended Option 3: Inter + DM Serif Display

### Why This Works:
- **Inter**: Clean body font
- **DM Serif Display**: Elegant, sophisticated serif for headings
- **Combination**: More traditional enterprise feel with modern body

### Characteristics:
- ✅ More traditional/classical feel
- ✅ Very professional and trustworthy
- ✅ Elegant and sophisticated
- ✅ Slightly more formal

### Best For:
- Established institutions
- More conservative student base
- Traditional academic feel

---

## Recommended Option 4: Inter + Space Grotesk

### Why This Works:
- **Inter**: Clean body font
- **Space Grotesk**: Modern, geometric, friendly
- **Combination**: Balanced modern and professional

### Characteristics:
- ✅ Modern and approachable
- ✅ Clean geometric design
- ✅ Professional yet friendly
- ✅ Great for tech platforms

---

## Final Recommendation: **Inter + Plus Jakarta Sans** ⭐

### Why This is the Best Choice:

1. **Student Appeal**:
   - Plus Jakarta Sans is modern and friendly
   - Not intimidating or corporate
   - Appeals to younger demographics
   - Used by successful ed-tech platforms

2. **Enterprise Credibility**:
   - Professional appearance
   - Clean and trustworthy
   - Used by major companies
   - Maintains business credibility

3. **Technical Excellence**:
   - Excellent readability
   - Great font rendering
   - Multiple weights available
   - Optimized for screens

4. **Versatility**:
   - Works for all content types
   - Scales well across devices
   - Good for both headings and body
   - Supports multiple languages

---

## Typography Scale

### Heading Scale (Plus Jakarta Sans):
- **H1 (Hero)**: 4rem - 5rem (64px - 80px) - Bold (700)
- **H1 (Page)**: 3rem - 4rem (48px - 64px) - Bold (700)
- **H2**: 2.25rem - 3rem (36px - 48px) - Bold (700)
- **H3**: 1.875rem - 2.25rem (30px - 36px) - SemiBold (600)
- **H4**: 1.5rem - 1.875rem (24px - 30px) - SemiBold (600)
- **H5**: 1.25rem - 1.5rem (20px - 24px) - SemiBold (600)
- **H6**: 1.125rem - 1.25rem (18px - 20px) - Medium (500)

### Body Scale (Inter):
- **XL**: 1.25rem (20px) - Regular (400)
- **LG**: 1.125rem (18px) - Regular (400)
- **Base**: 1rem (16px) - Regular (400)
- **SM**: 0.875rem (14px) - Regular (400)
- **XS**: 0.75rem (12px) - Regular (400)

### Special Text:
- **Display**: 5rem - 6rem (80px - 96px) - Bold (700) - Plus Jakarta Sans
- **Lead**: 1.25rem - 1.5rem (20px - 24px) - Regular (400) - Inter
- **Small**: 0.875rem (14px) - Regular (400) - Inter
- **Muted**: 0.875rem (14px) - Regular (400) - Inter (lighter color)

---

## Implementation Strategy

### Font Loading:
```typescript
// Use Next.js font optimization
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})
```

### CSS Variables:
```css
:root {
  --font-body: var(--font-inter);
  --font-display: var(--font-display);
  
  /* Typography Scale */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
  
  /* Letter Spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

### Usage Examples:
```css
/* Headings */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

/* Body Text */
body, p, li, span {
  font-family: var(--font-body);
  font-weight: 400;
  line-height: var(--leading-relaxed);
}

/* Hero Text */
.hero-title {
  font-family: var(--font-display);
  font-size: var(--text-5xl);
  font-weight: 800;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

/* Card Titles */
.card-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 600;
  line-height: var(--leading-snug);
}
```

---

## Visual Hierarchy Examples

### Hero Section:
```
Plus Jakarta Sans - 5rem (80px) - Bold (700)
"Your Pathway to a Bright Future Starts Here"

Inter - 1.5rem (24px) - Regular (400)
"Get started with Course Centre and book a free consultation..."
```

### Section Headings:
```
Plus Jakarta Sans - 3rem (48px) - Bold (700)
"Helping You Make the Right Choices"

Inter - 1.125rem (18px) - Regular (400)
"We provide end-to-end support..."
```

### Card Titles:
```
Plus Jakarta Sans - 1.5rem (24px) - SemiBold (600)
"Free Consultation"

Inter - 1rem (16px) - Regular (400)
"Get personalised guidance..."
```

---

## Responsive Typography

### Mobile:
- Hero: 2.5rem - 3rem (40px - 48px)
- H1: 2rem - 2.5rem (32px - 40px)
- H2: 1.75rem - 2rem (28px - 32px)
- Body: 1rem (16px)

### Tablet:
- Hero: 3.5rem - 4rem (56px - 64px)
- H1: 2.5rem - 3rem (40px - 48px)
- H2: 2rem - 2.25rem (32px - 36px)
- Body: 1rem (16px)

### Desktop:
- Hero: 4.5rem - 5rem (72px - 80px)
- H1: 3rem - 4rem (48px - 64px)
- H2: 2.25rem - 3rem (36px - 48px)
- Body: 1rem (16px)

---

## Accessibility Considerations

- ✅ Minimum font size: 16px for body text
- ✅ Line height: 1.5 for body, 1.25 for headings
- ✅ Contrast ratio: WCAG AA compliant (4.5:1 for body, 3:1 for large text)
- ✅ Font weights: Clear distinction between weights
- ✅ Letter spacing: Optimized for readability

---

## Performance Optimization

- ✅ Use Next.js font optimization
- ✅ Font display: swap (prevents FOIT)
- ✅ Subset fonts (latin only initially)
- ✅ Preload critical fonts
- ✅ Variable fonts where possible

---

## Next Steps

1. **Review this recommendation**
2. **Choose the font pairing** (Recommended: Inter + Plus Jakarta Sans)
3. **Implement in layout.tsx**
4. **Update globals.css with typography scale**
5. **Apply to all components**
6. **Test across devices**

---

## Alternative: If You Want More Traditional

If you prefer a more traditional, established feel:
- **Inter + Playfair Display**: More elegant, classical
- **Inter + DM Serif Display**: More sophisticated, traditional

But for student appeal + enterprise credibility, **Inter + Plus Jakarta Sans** is the best balance.


