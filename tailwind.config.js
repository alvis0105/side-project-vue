/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontSize: {
        font32: [
          '32px',
          { fontWeight: '500', lineHeight: '32px', letterSpacing: '0.04em' },
        ],
        font28: [
          '28px',
          { fontWeight: '500', lineHeight: '28px', letterSpacing: '0.04em' },
        ],
        font24: [
          '24px',
          { fontWeight: '700', lineHeight: '24px', letterSpacing: '0.04em' },
        ],
        font22: [
          '20px',
          { fontWeight: '700', lineHeight: '22px', letterSpacing: '0.02em' },
        ],
      },
    },
  },
}
