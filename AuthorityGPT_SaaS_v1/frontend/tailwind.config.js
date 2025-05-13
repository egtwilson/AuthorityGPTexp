/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6D9DFF', // Lighter shade for hover or secondary elements
          DEFAULT: '#4A80FF', // Main primary color
          dark: '#3A66CC',  // Darker shade for active states or deeper emphasis
        },
        secondary: {
          light: '#FFD47A',
          DEFAULT: '#FFC14A',
          dark: '#CCA73A',
        },
        accent: {
          light: '#FF8A80',
          DEFAULT: '#FF5252', // A contrasting accent color
          dark: '#CC4141',
        },
        neutral: {
          lightest: '#F8F9FA', // Very light gray, almost white
          lighter: '#E9ECEF',  // Light gray
          light: '#DEE2E6',    // Slightly darker light gray
          DEFAULT: '#CED4DA',  // Default neutral, good for borders
          medium: '#ADB5BD',   // Medium gray
          dark: '#6C757D',     // Dark gray, good for secondary text
          darker: '#495057',   // Darker gray
          darkest: '#212529',  // Almost black, good for primary text
          background: '#F4F7FC', // A soft blueish-gray for backgrounds
        },
        success: '#28A745',
        danger: '#DC3545',
        warning: '#FFC107',
        info: '#17A2B8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Assuming Inter is a preferred font
      },
    },
  },
  plugins: [],
}
