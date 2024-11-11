const mix = require('laravel-mix');

mix
  .js('src/app.js', 'public/js')
  .sass('src/scss/style.scss', 'css')
  .setPublicPath('public')
  .copy('src/index.html', 'public/')
  .copy('working/response_sample_*.json', 'public/test_data/');
