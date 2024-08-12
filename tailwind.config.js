module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '40%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        bounceIn: 'bounceIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
}