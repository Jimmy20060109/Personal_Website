# Frontend

## Run locally

1. Copy env file:

```bash
cp .env.example .env.local
```

2. Install dependencies:

```bash
npm install
```

3. Start dev server:

```bash
npm run dev
```

## Home card spacing

The fixed navbar publishes its measured border-box height as `--navbar-height`,
updated before paint and whenever its size changes. The home grid adds
`--home-card-top-gap` (2.5rem to 4rem) below it on all screen sizes so the entrance
bounce and hover lift stay clear of the navbar. Adjust this gap in
`src/views/Home.css` rather than hard-coding a navbar offset per breakpoint.

## About translations

`src/components/About.tsx` keeps English and Chinese copy in one module-level
`translations` object, grouped by paragraph with matching keys in both languages.
`useTranslations` selects the copy for a single shared JSX layout. Keep links,
logos, and formatting in that layout, and include any required spaces and
punctuation in the translated text fragments.
