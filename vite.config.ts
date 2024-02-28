import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/apiGet': {
        target:
          'http://apis.data.go.kr/1320000/LosfundInfoInqireService/getLosfundInfoAccToClAreaPd',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apiGet/, ''),
      },
      '/apiLost': {
        target:
          'http://apis.data.go.kr/1320000/LostGoodsInfoInqireService/getLostGoodsInfoAccToClAreaPd',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apiLost/, ''),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
