'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');  
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    return gulp.src('./public/modules/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(concat("dist.min.css"))
        .pipe(gulp.dest('./public'));
});

gulp.task('javascript', function () {
    gulp.src(['public/modules/app.js', 'public/modules/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('dist.js'))
        .pipe(gulp.dest('public'))
        .pipe(rename('dist.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public'));
});

gulp.task('build', ['sass', 'javascript'])

// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });