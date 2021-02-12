// const { task } = require('gulp');
'use strict';
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
const jsdoc = require('gulp-jsdoc3');

sass.compiler = require('node-sass');
gulp.task('sass', function() {
    return gulp.src("./css/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
gulp.task('doc', function (cb) {
    //const config = require('./jsdoc.json');
    gulp.src(['./js/*.js'], {read: false})
        .pipe(jsdoc(cb));
});

gulp.task('serve', gulp.series(['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./css/*.scss", gulp.series(['sass']));
    gulp.watch("./js/*.js" , gulp.series(['doc']));
    gulp.watch("./js/*.js").on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);

}));
//  function defaultTask(cb) {
//      // place code for your default task here
//      cb();
//    }
  
 

//    exports.default = defaultTask

  gulp.task('default',gulp.series(['serve']));