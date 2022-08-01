/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Cerebri Sans', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				black: {
					DEFAULT: '#231F20',
				},
				green: {
					DEFAULT: '#03a84e',
					30: '#1EA75B',
				},
			},
		},
	},
	plugins: [],
};
