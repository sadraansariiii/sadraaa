module.exports = {
  theme: {
    extend: {
      animation: {
        shake: 'shake 0.6s ease-in-out',
        fadeIn: 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(-5px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
}