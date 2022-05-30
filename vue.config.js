const IN_PRODUCTION = process.env.NODE_ENV === 'production';
const path = require('path');

let publicPath;
if (IN_PRODUCTION) {
    // publicPath = '/asset-inventory';
    publicPath = '/it-asset-inventory';
} else {
    publicPath = '/';
}

const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    pages : {
        index : {
            entry    : 'src/main.js',
            template : 'public/index.html',
            filename : 'index.html',
            title    : 'Store Management'
        }
    },
    transpileDependencies : true,
    publicPath            : publicPath,
    assetsDir             : 'static',
    outputDir             : 'dist',
    configureWebpack      : {
        resolve : {
            alias : {
                '@'           : path.resolve(__dirname, 'src'),
                '@components' : path.resolve(__dirname, 'src', 'components'),
                '@routes'     : path.resolve(__dirname, 'src', '_config', 'routes')
            }
        }
    },
    devServer : {
        proxy : 'http://localhost:8000'
    }
});
