# AIBuild Construction Software

This is the Node.js/Next.js migration of the original `index.html`.

## Start

```powershell
npm install
npm run dev
```

Open:

http://localhost:3000

## Source preservation

The original `index.html` remains in the project as the source reference.

The original image should be copied from:

`image\image 98.jpg`

to:

`public\images\image-98.jpg`

## Functionality

No new functionality has been added. The existing lead form behavior is preserved:
- prevents the normal browser form submission
- collects the existing form fields
- collects checked requirements
- logs the lead in the browser console
- shows the existing thank-you alert
- resets the form
