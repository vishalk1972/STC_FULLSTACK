/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'chat': "url('https://mir-s3-cdn-cf.behance.net/project_modules/disp/1ce52173426833.5c08f56353039.png')",
        'chat1': "url('https://t4.ftcdn.net/jpg/03/78/40/11/360_F_378401105_9LAka9cRxk5Ey2wwanxrLTFCN1U51DL0.jpg')",
        'chat2': "url('https://swall.teahub.io/photos/small/12-129518_wallpaper.jpg')",
      }
    },
  },
  plugins: [],
}

