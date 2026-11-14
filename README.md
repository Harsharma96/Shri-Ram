# श्री रामचरितमानस कथा महोत्सव

A mobile-first digital invitation for a Shri Ram Katha. It opens on Shri Ram Mandir at dusk, where
"॥ जय श्री राम ॥", "श्री रामचरितमानस" and the *मंगल भवन अमंगल हारी* chaupai fly up out of the
temple's spire. A tap flies the camera into the sanctum door for darshan, followed by the
invitation scroll, the karyakram (schedule), the katha vyas, the organisers and the contact
details. A Ramayan chaupai plays in the background.

## Run it locally

You need Node.js 20 or newer.

```sh
npm install
npm run dev      # http://localhost:3000
```

Production build:

```sh
npm run build
npm start
```

## Changing the content

| What                                                  | Where                                    |
| ----------------------------------------------------- | ---------------------------------------- |
| Event name, organiser, promoters, venue, phone numbers, blessing text | `src/data/business.ts`   |
| Page sections                                         | `src/components/ramayan/`                |
| Pictures (temple, darshan, karyakram poster, speaker) | `src/assets/`                            |
| Background music                                      | `public/ramayan-chaupai.mp3`             |
| Page title and description (SEO / sharing)            | `src/app/layout.tsx`                     |

The karyakram schedule is artwork: to change its dates, replace the images in
`src/assets/karyakram/` and update the matching `alt` text in
`src/components/ramayan/KathaTimeline.tsx`.

## Built with

- Next.js (App Router) and React
- TypeScript
- Tailwind CSS
- Motion (animations)
