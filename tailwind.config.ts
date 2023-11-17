import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'bottom': '0 4px 0 rgb(0 0 0)',
        'bottom-purple': '0 4px 0 #672171'
      }
    }
  },
  plugins: [],
}
export default config
