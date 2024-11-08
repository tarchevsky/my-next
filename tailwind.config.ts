import type {Config} from "tailwindcss";
import {DARK_THEME, THEME} from "./src/constants/theme.constants";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('daisyui'),
        require('@tailwindcss/typography'),
        function ({addUtilities}: any) {
            const containerUtility = {
                '.cont': {
                    'padding-left': '25px',
                    'padding-right': '25px',
                    '@screen sm': {
                        'padding-left': '40px',
                        'padding-right': '40px'
                    },
                    '@screen md': {
                        'padding-left': '54px',
                        'padding-right': '54px'
                    },
                    '@screen 2xl': {
                        'padding-left': '54px',
                        'padding-right': '54px'
                    }
                }
            }
            addUtilities(containerUtility, ['responsive'])
        }
    ],
    daisyui: {
        themes: [{
            [THEME]: {
                ...require('daisyui/src/theming/themes')[THEME],
                '--glass-blur': '3px',
                '.glass': {
                    'background-image':
                        'linear-gradient(\n' +
                        '        rgb(255 255 255 / var(--glass-opacity, 20%)) 50%,\n' +
                        '        rgb(0 0 0 / 0%) 100%\n' +
                        '      )'
                }
            },
            [DARK_THEME]: {
                ...require('daisyui/src/theming/themes')[DARK_THEME],
            },
        }],
        base: true, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
        themeRoot: ':root' // The element that receives theme color CSS variables
    },
    darkMode: ['class', `[data-theme=${DARK_THEME}]`]
};
export default config;
