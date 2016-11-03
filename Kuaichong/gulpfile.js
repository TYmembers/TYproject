var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    rename=require('gulp-rename');



gulp.task('cssmin',function () {
    return gulp.src('css/*.css')
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('lib'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('jsmin',function () {
    return gulp.src('js/*.js')
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('lib'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('default',function () {
    gulp.start('cssmin','jsmin')
});