/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'chat': "url('https://i.pinimg.com/originals/c6/f8/05/c6f8054235ac9523148c25010952d3af.jpg')",
        'chat1': "url('https://t4.ftcdn.net/jpg/03/78/40/11/360_F_378401105_9LAka9cRxk5Ey2wwanxrLTFCN1U51DL0.jpg')",
        'chat2': "url('https://swall.teahub.io/photos/small/12-129518_wallpaper.jpg')",
      }
    },
    theme: {
      colors: {
        transparent: 'transparent',
      },
    },
  },
  plugins: [],
}

