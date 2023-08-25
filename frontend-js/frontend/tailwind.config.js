module.exports = {
  content: [
    "./index.html", // Add the path to your HTML files
    "./index.js",
    "./src/**/*.html",
    "./src/**/*.js",
  ],
  theme: {
    // Your theme configuration
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      } 
    }
  },
  plugins: [
    // Your plugins
  ],
};
