import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import postcssSortMediaQueries from 'postcss-sort-media-queries';
import dotenv from 'dotenv';

// Завантажуємо змінні з key.env
dotenv.config({ path: './key.env' });

export default defineConfig(({ command }) => {
  return {
    define: {
      'process.env': process.env, // Додаємо змінні середовища
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src', // Вказуємо корінь проєкту
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'), // Підтримка кількох HTML-файлів
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'; // Виносимо залежності в окремий файл
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      outDir: '../dist', // Вихідна папка
      emptyOutDir: true,
    },
    css: {
      postcss: {
        plugins: [
          postcssSortMediaQueries({
            sort: 'mobile-first', // Сортуємо медіа-запити
          }),
        ],
      },
    },
    plugins: [
      injectHTML(), // Вставка HTML
      FullReload(['./src/**/*.html']), // Повне перезавантаження при зміні HTML
    ],
    server: {
      open: true, // Відкрити у браузері при запуску
    },
  };
});
