Generate the SEO block for a local business website. This should be added to the `<head>` of every site we build.

You need the following business details before generating — ask if any are missing:
- Business name
- Business type (nail salon, restaurant, barber, etc.)
- Street address, city, state, zip
- Phone number
- Hours (each day)
- Google rating + review count (if known)
- Hero image filename
- Website URL (if live — leave blank if not yet deployed)

Then output two blocks ready to paste into the HTML `<head>`:

**Block 1 — Open Graph tags** (controls how the link looks when shared via text/social):
```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:type" content="website">
<meta property="og:url" content="...">
<meta property="og:image" content="...">
```

**Block 2 — Schema.org JSON-LD** (tells Google what kind of business this is):
Use the correct `@type` for the business (NailSalon, Restaurant, HairSalon, BarberShop, etc. — full list at schema.org).
Include: name, image, telephone, address, geo coordinates (look up lat/lng from the address), openingHoursSpecification for each day group, priceRange, and aggregateRating if known.

```html
<script type="application/ld+json">
{ ... }
</script>
```

After generating, remind the user:
- The `og:image` and `og:url` need real hosted URLs once the site is deployed (local file paths won't work for sharing)
- Verify the geo coordinates are accurate (use Google Maps to confirm lat/lng)
- This is layer 4 of local SEO — Google Business Profile is more impactful and should be set up separately
