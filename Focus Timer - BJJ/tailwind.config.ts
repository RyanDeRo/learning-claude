import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      colors: {
        // Custom pixel art palette - can be expanded later
        pixel: {
          bg: '#1a1a2e',
          panel: '#16213e',
          accent: '#e94560',
          success: '#0f3460',
        }
      }
    },
  },
  plugins: [],
} satisfies Config
