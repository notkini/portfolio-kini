# Aditya Kinikar — Personal Portfolio

A clean, minimalist, typography-focused personal developer portfolio built with Next.js and Tailwind CSS. The design emphasizes content, readability, and a pure light aesthetic inspired by modern minimalist web design.

## Features

- **Minimalist Light Theme:** A stark, typography-driven interface with subtle borders and neutral grey accents.
- **Responsive Design:** Fully optimized for both desktop and mobile devices with a custom mobile drawer navigation.
- **Smooth Animations:** Subtle entrance and interactive animations powered by Framer Motion.
- **Scroll Spy Navigation:** The navigation bar automatically highlights the active section as you scroll.
- **Project Showcase:** Expandable project cards detailing case studies without visual clutter.
- **Experience & Skills:** Chronological timeline of professional experience and categorized technical skills.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** TypeScript

## Getting Started

First, clone the repository and install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/` - Next.js app router pages, layout, and global styles (`globals.css`).
- `src/components/` - React components organized by `layout/`, `sections/`, and `ui/`.
- `src/data/portfolio.ts` - Centralized data file containing personal info, experience, projects, and skills.
- `src/hooks/` - Custom React hooks (e.g., `useScrollSpy`).

## Customization

To update the portfolio with your own information, modify the `src/data/portfolio.ts` file. The UI components will automatically reflect the new data. Theme variables (colors, fonts) can be adjusted directly in `src/app/globals.css`.

## License

This project is open-source and available under the [MIT License](LICENSE).
