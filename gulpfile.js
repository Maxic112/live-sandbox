import gulp from 'gulp';
import cssMin from 'gulp-cssmin';
import {deleteSync} from 'del';
import sassDart from 'gulp-dart-sass';
import ifG from 'gulp-if';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import zip from 'gulp-zip';
import livereload from 'gulp-livereload';
import concat from 'gulp-concat';

import fs from 'fs';
import {pipeline} from 'readable-stream';
import browserSync from 'browser-sync';

import Module from "node:module";
const require  = Module.createRequire(import.meta.url);

const uglify = require('gulp-uglify-es').default;


let jsPath = './js/parts/**/*.js';
let isDev = false;
let stylesOnlyModify = false;

gulp.task('dev', function () {
  isDev = true;
  gulp.watch(jsPath, gulp.series('js:concat'));
  gulp.watch(['./scss/**/*.scss', '!./scss/**/_*.scss'], gulp.series('styles')).on('change', () => {
    stylesOnlyModify = true;
  });
  gulp.watch('./scss/**/_*.scss', gulp.series('styles')).on('change', () => {
    stylesOnlyModify = false;
  });
  gulp.watch("./*.html").on('change', browserSync.reload);

  gulp.series(
    'clean',
    gulp.parallel('js:concat', 'styles'),
    'server',
  )();
});

gulp.task('styles', function () {
  let srcParam = {};
  if ( stylesOnlyModify ) {
    srcParam = {since: gulp.lastRun('styles')};
  }
  return gulp.src('./scss/**/*.scss', srcParam)
    .pipe(ifG(isDev, sourcemaps.init()))
    .pipe(sassDart().on('error', sassDart.logError))
    .pipe(ifG(!isDev, autoprefixer({
      // browsers: ["> 0%"],
      cascade: false
    })))
    .pipe(ifG(isDev, sourcemaps.write('.')))
    .pipe(ifG(!isDev, cssMin()))
    .pipe(gulp.dest('./css'))
    .pipe(ifG(isDev, livereload()))
    .pipe(ifG(isDev, browserSync.stream()));
});

gulp.task('js:concat', function(cb) {
  return pipeline(
    gulp.src(jsPath),
    concat('finerenon-all.js'),
    ifG(!isDev, uglify()),
    gulp.dest('./js/')
  );
});

gulp.task('clean', gulp.series(function deleteFiles (done) {
  deleteSync([
    './*.zip',
    './css/pages/**',
    './css/styles.css',
    './css/**/*.css.map',
  ]);
  done();
}));

gulp.task('build', gulp.series(
  function setProdMode (done) {
    isDev = false;
    done();
  },
  'clean',
  gulp.parallel('styles', 'js:concat'),
));

gulp.task('server', function (cd) {
  browserSync.init({
    server: {
      baseDir: './',
    },
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: false,
    },
    https: true,
    open: false,
    online: true,
    tunnel: false,
    directory: true,
  });
  cd();
});

gulp.task('to-zip', function(){
  const stamp = Math.trunc(Date.now()/1000/60); // Minutes
  let archiveName = `esculap-hbp-${stamp}.zip`;
  if ( fs.existsSync(archiveName) ) {
    fs.unlinkSync(archiveName);
  }
  return gulp.src([
    'fonts/**',
    'css/**',
    'js/**',
    'images/**',
    '*.html',
  ], {base: "./"})
    .pipe(zip(archiveName))
    .pipe(gulp.dest('./'))
});

gulp.task('export-to-zip', gulp.series('build', 'to-zip'));
