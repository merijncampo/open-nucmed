import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Minimale, veilige configuratie voor browser-omgevingen
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
  }
});