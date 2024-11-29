/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      spacing: {
        15: '3.75rem',
      },
      inset: {
        '20%': '20%',
      },
      backdropBlur: {
        28: '28px',
      },
      colors: {
        primary: {
          10: 'hsl(227, 100%, 10%)',
          20: 'hsl(227, 100%, 20%)',
          30: 'hsl(227, 100%, 30%)',
          40: 'hsl(227, 100%, 40%)',
          50: 'hsl(227, 100%, 50%)',
          60: 'hsl(227, 100%, 60%)',
          70: 'hsl(227, 100%, 70%)',
          80: 'hsl(227, 100%, 80%)',
          90: 'hsl(227, 100%, 90%)',
        },
        black: 'hsl(0, 0%, 0%)',
        neutral: {
          10: 'hsl(0, 0%, 10%)',
          20: 'hsl(0, 0%, 20%)',
          30: 'hsl(0, 0%, 30%)',
          40: 'hsl(0, 0%, 40%)',
          50: 'hsl(0, 0%, 50%)',
          60: 'hsl(0, 0%, 60%)',
          70: 'hsl(0, 0%, 70%)',
          80: 'hsl(0, 0%, 80%)',
          90: 'hsl(0, 0%, 90%)',
          97: 'hsl(0, 0%, 97%)',
        },
        white: 'hsl(0, 0%, 100%)',
        danger: '#FF3333',
        dangerBG: '#FEF1F1',
        dangerBGHover: '#FEECEC',
        dangerDark: 'rgba(204, 35, 35, 1)',
        active: '#4D94FF',
        activeBG: '#F7F8FD',
        activeBGHover: '#EEF1FB',
        success: '#61C82F',
        warning: '#EC7F00',
        devider: '#EEEEEE',
        modalBG: 'rgba(0, 22, 102, 0.3)',
        borderLine: '#FFFFFF1A',
        buttonBgGrey: 'rgba(128, 128, 128, 0.8)',
        surface: {
          1: '#F2F5F9',
          2: '#EEF8FB',
          3: '#F4F7FF',
          4: '#FBFDFF',
          5: '#E1EBF9',
          6: '#FBFBFB',
          7: '#FAFBFF',
        },
        gridColor: '#22D3EE',
        elevationColor: '#F7F2FA',
        customGray: '#EEEEEE',
        numberIcon: {
          light: '#00CFFD',
          dark: '#4727A0',
        },
        temperature: '#FFE15E',
        video: '5EFFDC',
      },
      fontSize: {
        font36: [
          '36px',
          { fontWeight: '500', lineHeight: '36px', letterSpacing: '0.04em' },
        ],
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
        font20: [
          '20px',
          { fontWeight: '500', lineHeight: '20px', letterSpacing: '0.01em' },
        ],
        font20Regular: [
          '20px',
          { fontWeight: '400', lineHeight: '20px', letterSpacing: '0.01em' },
        ],
        font16: ['16px', { fontWeight: '500', lineHeight: '16px' }],
        font16Regular: ['16px', { fontWeight: '400', lineHeight: '16px' }],
        font14: ['14px', { fontWeight: '500', lineHeight: '14px' }],
        font14Regular: ['14px', { fontWeight: '400', lineHeight: '14px' }],
      },
      borderRadius: {
        '4xl': '32px',
      },
      borderWidth: {
        6: '6px',
      },
      lineHeight: {
        15: '64px',
      },
      zIndex: {
        onMapFirst: '600',
        onMapSecond: '500',
        highest: '9999',
      },
    },
  },
  plugins: [],
}

