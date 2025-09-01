import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/styles/**/*.{css}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#7C3AED'
      },
      fontFamily: {
        // Handwritten feel with system fallbacks
        comic: [
          'ui-rounded',
          'ui-sans-serif',
          'Segoe UI',
          'Comic Neue',
          'Arial Rounded MT Bold',
          'system-ui',
          'sans-serif'
        ]
      },
      boxShadow: {
        panel: '0 0 0 3px #000'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn .6s ease-out both',
        float: 'float 3s ease-in-out infinite'
      }
    }
  },
  plugins: []
}

export default config



