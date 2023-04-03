const spacing = {}
const borderRadius = {}
const fontSize = {}

;(() => {
  for (let i = 0; i <= 180; i++) {
    if (i <= 20)
      borderRadius[i] = `${i}px`

    if (i >= 8 || i <= 30)
      fontSize[i] = `${i}px`

    spacing[i] = `${i}px`
  }
})()

module.exports = {
  // important: '#app',
  content: ['*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    spacing,
    fontSize,
    borderRadius: {
      ...borderRadius,
      full: '100%'
    },
    fontWeight: {
      400: 400,
      500: 500,
      600: 600,
      bold: 'bold'
    },
    extend: {
      zIndex: {
        1: 1,
        2: 2,
        2000: 2000
      },
      spacing: {
        257: '257px',
        300: '300px'
      },
      height: {
        186: '186px'
      },
      backgroundSize: {
        full: '100% 100%'
      },
      keyframes: {
        fadeThrough: {
          '0%': { opacity: 0.1, width: 0 },
          '20%': { opacity: 0.5, width: 0 },
          '100%': { opacity: 0, width: '100%' }
        },
        breathing: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' }
        }
      },
      animation: {
        fadeThrough: 'fadeThrough 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite',
        breathing: 'breathing 1.5s ease infinite'
      }
    }
  },
  // 禁用核心插件
  corePlugins: {
    // preflight: false,
  },
  plugins: []
}
