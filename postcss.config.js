export default {
  plugins: {
    'postcss-import': {}, // Enables css files to be imported from other files
    'postcss-advanced-variables': {}, // Enables loops, variables
    'postcss-nested': {}, // Enables nested CSS like SCSS
    'postcss-custom-properties': {
      preserve: true // Keeps the variables in the output, you can set it to false if not needed
    },
    tailwindcss: {},
    autoprefixer: {},
  },
}
