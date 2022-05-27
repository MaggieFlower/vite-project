import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuejsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

function pathResolve(dir) {
    return resolve(__dirname, '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vuejsx()],
    resolve: {
        alias: {
            '@': pathResolve('src'),
        },
        extensions: ['.ts', '.tsx', '.js'],
    },
    server: {
        port: 8082,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
