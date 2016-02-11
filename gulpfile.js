'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');  

gulp.task('sass', function () {
    return gulp.src('./public/services/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(concat("app.min.css"))
        .pipe(gulp.dest('./public'));
});

gulp.task('javascript', function () {
    gulp.src(['public/services/app.js', 'public/services/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest("public"))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest("public"));
});

gulp.task('build', ['sass', 'javascript'])

// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });