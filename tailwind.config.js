/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        '1': '1px'
      }
    },
  },
  plugins: [],
  mode: 'jit',
  // module: {
  //   rules: [
  //     {
  //       test: /\.scss$/,
  //       use: [
  //         'style-loader',
  //         'css-loader',
  //         'sass-loader',
  //       ],
  //     },
  //   ],
  // }
}

