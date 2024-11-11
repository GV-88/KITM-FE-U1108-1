//https://github.com/jmsfwk/dotenv-mix

const mix = require('laravel-mix');
const env = require('dotenv-mix');

mix.extend('env', env);

mix
  .js('src/app.js', 'public/js')
  .sass('src/scss/style.scss', 'css')
  .setPublicPath('public')
  .env()
  .copy('src/index.html', 'public/')
  .copy('working/response_sample_*.json', 'public/test_data/');
