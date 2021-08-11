const { resolve } = require('path');

export default {
    base: './',
    // base: '/randomnumber-generator-web/',
    server: {
        port: 4200,
    },
    build: {
        rollupOptions: {
            // Multipage app, akses dengan http://localhost:4200/about/
            // Jika di production, berubah urlnya menjadi alamathost/about
            input: {
                main: resolve(__dirname, 'index.html'),
            },
        },
    },
};
