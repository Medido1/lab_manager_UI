import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(),tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      navigateFallback: '/index.html',
      globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      includeAssets: 
      ['delete.png', 'edit.png',
        'folder.png', 'logout.png',
        'microscope.png', 'righ-arrow.png',
        'settings.png', 'telephone.png',
        'file.png','view.png',
        'dark.png', 'light.png'
      ],
      manifest: {
        name: "My lab manager",
        short_name: "LabManage",
        start_url: '/',
        display: "browser",
        background_color: '#ffffff',
        theme_color: '#317EFB',
      }
    })
  ],
})