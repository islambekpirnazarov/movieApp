// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import compression from 'vite-plugin-compression'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        search: resolve(__dirname, 'search/search.html'),
        tvshows: resolve(__dirname, 'tvshows/tvshows.html'),
        categories: resolve(__dirname, 'categories/categories.html'),
        detail: resolve(__dirname, 'detail/detail.html'),
      },
    },
  },
  plugins : [compression()]
})