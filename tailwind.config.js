module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A2639',
          light: '#2D4356',
          dark: '#0F1A28',
        },
        accent: {
          DEFAULT: '#3498DB',
          light: '#5DADE2',
          dark: '#2980B9',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#F8FAFB',
          muted: '#F1F5F9',
        },
        content: {
          DEFAULT: '#1A2639',
          secondary: '#4A5568',
          muted: '#718096',
          dim: '#A0AEC0',
        },
        border: {
          DEFAULT: 'rgba(26, 38, 57, 0.08)',
          hover: 'rgba(26, 38, 57, 0.15)',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Geist', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-lg': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-sm': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-xl': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-lg': ['1.5rem', { lineHeight: '1.35', fontWeight: '600' }],
        'heading-md': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(26, 38, 57, 0.06)',
        'card-hover': '0 8px 32px rgba(26, 38, 57, 0.1)',
        'elevated': '0 8px 24px rgba(26, 38, 57, 0.08), 0 4px 8px rgba(26, 38, 57, 0.04)',
        'glow': '0 0 40px rgba(52, 152, 219, 0.1)',
        'glow-accent': '0 0 60px rgba(52, 152, 219, 0.15)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};