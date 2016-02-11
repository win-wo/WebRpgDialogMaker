'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');

gulp.task('sass', function () {
    return gulp.src('./services/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(concat("app.min.css"))
        .pipe(gulp.dest('./public'));
});

gulp.task('javascript', function () {
    gulp.src(['services/app.js', 'services/**/*.js'])
        .pipe(uglify('app.min.js', {
            outSourceMap: true
        }))
        .pipe(gulp.dest('public'))
});

gulp.task('build', ['sass', 'javascript'])

// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });