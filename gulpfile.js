// Системны библиотеки
const gulp = require('gulp');
const {
  src,
  dest
} = require('gulp');
const browser_sync = require('browser-sync').create();
const del = require('del');
const fs = require('fs');
const stripComments = require('gulp-strip-comments');


//Пути проекта
const srcFolder = './src';
const buildFolder = './dist';
const path = {
  build: {
    html: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    img: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    res: `${buildFolder}/resources/`
  },
  src: {
    html: `${srcFolder}/*.html`,
    scss: `${srcFolder}/scss/style.scss`,
    js: `${srcFolder}/js/index.ts`,
    img: `${srcFolder}/img/**/*`,
    fonts: `${srcFolder}/fonts/*.ttf`,
    res: `${srcFolder}/resources/**/*`
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/**/**/*.ts`,
    img: `${srcFolder}/img/**/*`,
  },
  clean: `${buildFolder}/`
}

//HTML plugins
const file_include = require('gulp-file-include');
const webp_html = require('gulp-webp-html');
const typograf = require('gulp-typograf');

//Styles plugins
const gulp_sass = require('gulp-sass')(require('sass'));
const css_min = require('gulp-cssmin');
const gcmq = require('gulp-group-css-media-queries');
const auto_prefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso')

//JavaScript plugins
const webpack = require('webpack');
const webpack_stream = require('webpack-stream');
const uglify = require('gulp-uglify-es');
const ts = require('gulp-typescript');

//Images plugins
const imageMin = require('gulp-imagemin');
const webp = require('gulp-webp');

//Fonts plugins
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

// Dev server
function browserSync() {
  browser_sync.init({
    server: {
      baseDir: path.build.html
    },
    port: 3000,
    notify: false
  })
}

//Delete build folder
function clean() {
  return del(path.clean)
}

//Режим разработки
function html() {
  return src(path.src.html)
    .pipe(file_include({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(typograf({
      locale: ['ru', 'en-US']
    }))
    .pipe(webp_html())
    .pipe(dest(path.build.html))
    .pipe(browser_sync.stream())
}

function styles() {
  return src(path.src.scss)
    .pipe(gulp_sass())
    .pipe(auto_prefixer({
      cascade: false
    }))
    .pipe(gcmq())
    .pipe(dest(path.build.css))
    .pipe(browser_sync.stream())
}

function scripts() {
  return src(path.src.js)
    .pipe(webpack_stream({
      output: {
        filename: 'index.js'
      },
      mode: 'development',
      module: {
        rules: [{
            test: /\.(?:js|mjs|cjs)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', {
                    targets: "defaults"
                  }]
                ]
              },
            },
          },
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ]
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
    }))
    .pipe(dest(path.build.js))
    .pipe(browser_sync.stream())
}

function img() {
  return src(path.src.img)
    .pipe(dest(path.build.img))
    .pipe(webp())
    .pipe(dest(path.build.img))
    .pipe(browser_sync.stream())
}

function fonts() {
  src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts))
  return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts))
}

function res() {
  return src(path.src.res)
    .pipe(dest(path.build.res))
}

//Режим сборки
function prodHtml () {
  return src(path.src.html)
  .pipe(file_include({
    prefix: '@@',
    basepath: '@file'
  }))
  .pipe(typograf())
  .pipe(webp_html({
    locale: ['ru', 'en-US']
  }))
  .pipe(stripComments())
  .pipe(dest(path.build.html))
  .pipe(browser_sync.stream())
}

function prodStyles() {
  return src(path.src.scss)
    .pipe(gulp_sass())
    .pipe(auto_prefixer({
      cascade: false
    }))
    .pipe(gcmq())
    .pipe(csso({
      restructure: false,
      debug: true
    }))
    .pipe(dest(path.build.css))
    .pipe(browser_sync.stream())
}

function ProdScripts() {
  return src(path.src.js)
    .pipe(webpack_stream({
      output: {
        filename: 'index.js'
      },
      mode: 'production',
      module: {
        rules: [{
            test: /\.(?:js|mjs|cjs)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', {
                    targets: "defaults"
                  }]
                ]
              },
            },
          },
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ]
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
    }))
    .pipe(dest(path.build.js))
    .pipe(browser_sync.stream())
}

function prodImg() {
  return src(path.src.img)
    .pipe(dest(path.build.img))
    .pipe(webp())
    .pipe(imageMin({

    }))
    .pipe(dest(path.build.img))
    .pipe(browser_sync.stream())
}

//Отслеживание измениний файлов
function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.scss], styles);
  gulp.watch([path.watch.img], img);
  gulp.watch([path.watch.js], scripts);
}

// Сборка проекта
const build = gulp.series(clean, fonts, html, gulp.parallel(styles, img, res, scripts));
const dev = gulp.parallel(build, watchFiles, browserSync);
const buildProd = gulp.series(clean, fonts, html, gulp.parallel(prodStyles, prodImg, res, ProdScripts));
const prod = gulp.parallel(buildProd, watchFiles, browserSync);

//Helpers
function fontsStyle(done) {
  let srcFonts = `${srcFolder}/scss/mixins/_fonts.scss`;
  let appFonts = path.build.fonts;
  fs.writeFile(srcFonts, '', () => {});
  fs.readdir(appFonts, (err, items) => {
    if (items) {
      let c_fontname;
      for (let i = 0; i < items.length; i++) {
        let fontname = items[i].split('.'),
          fontExt;
        fontExt = fontname[1];
        fontname = fontname[0];
        if (c_fontname != fontname) {
          if (fontExt == 'woff' || fontExt == 'woff2') {
            fs.appendFile(srcFonts, `@include font-face("${fontname}", "${fontname}", 400);\r\n`, () => {});
          }
        }
        c_fontname = fontname;
      }
    }
  })
  done();
}

function cb() {}

exports.dev = dev;
exports.build = build;
exports.default = dev;
exports.buildProd = buildProd;
exports.prod = prod;
exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.img = img;
exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.res = res;
exports.scripts = scripts;
exports.prodHtml = prodHtml;
exports.prodStyles = prodStyles;
exports.ProdScripts = ProdScripts;
exports.prodImg = prodImg;

