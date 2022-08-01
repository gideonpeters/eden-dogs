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
					10: '#ebfff5',
					30: '#1EA75B',
				},
				purple: {
					DEFAULT: '#A0B0FE',
					30: '#e5e9fc',
					40: '#367ffe',
					50: '#3673FE',
				},
				orange: {
					DEFAULT: '#FA9D02',
				},
			},
		},
	},
	plugins: [],
};
