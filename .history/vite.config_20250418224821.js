import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"
import Components from 'unplugin-vue-components/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({}
      resolvers:[
        AntDesignVueResolver({
          importStyle:false
        })
      ]
    ])
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
