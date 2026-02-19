import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // v4 기준

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // 깃허브 리포지토리 이름을 여기에 넣으세요
})
