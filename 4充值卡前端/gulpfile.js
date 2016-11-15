/**
 * Created by Administrator on 2016/7/26.
 */
var gulp =require('gulp'),
    less = require('gulp-less'),
    minifycss =require('gulp-minify-css'),//css
    uglify = require('gulp-uglify');//js
//less

gulp.task('jsmin',function(){
    gulp.src('js/light.js')
        .pipe(uglify())
        .pipe(gulp.dest('lib'))
});
//jsmin
gulp.task('cssmin',function(){
    gulp.src('css/light.css')
        .pipe(minifycss())
        .pipe(gulp.dest('lib'))
});
//cssmin