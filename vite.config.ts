import { TailwindCSSVitePlugin } from 'tailwindcss-vite-plugin';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
        extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },
    server: {
        port: 3000,
    },
    build: {
        outDir: 'dist',
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'ArgoChat',
            fileName: (format) => `argo-chat.${format}.js`,
            formats: ['es', 'umd', 'iife'],
        },
        rollupOptions: {
            output: {
                globals: {
                    '@hestia.ai/argo-chat': 'ArgoChat',
                },
                amd: {
                    id: '@hestia.ai/argo-chat',
                },
            },
        },
    },
    plugins: [dts(), TailwindCSSVitePlugin()],
});
