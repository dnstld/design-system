'use strict'

const gulp = require('gulp')
const { watch, parallel } = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')

sass.compiler = require('node-sass')

const watcher = watch(['index.html', 'scss/**/*.scss'])

watcher.on('change', function(path, stats) {
  console.log(`File ${path} was changed`);
  return (path === 'index.html') ? browserSync.reload() : sassCompiler()
})

function sassCompiler() {
  return gulp
    .src('./scss/app.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
			stream: true
		}))
}

function server() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
}

exports.default = parallel(sassCompiler, server)