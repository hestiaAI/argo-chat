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
            fileName: 'argo-chat',
            formats: ['es', 'umd'],
        },
        rollupOptions: {
            // Remove external configuration to bundle Lit with your package
            output: {
                // Ensure proper module format output
                format: 'es',
                // Optional: Minimize chunk splitting
                inlineDynamicImports: true,
            },
        },
    },
    plugins: [dts(), TailwindCSSVitePlugin()],
});
