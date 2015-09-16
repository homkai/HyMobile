var Gulp = require('gulp');
var Jsx = require('gulp-react');
var Rename = require('gulp-rename');
var HyMobileWrapper = require('gulp-hymobile-wrapper');
var Dot = require('gulp-seajs-dot');
var CSS = require('gulp-seajs-css');

Gulp.task('css', function() {
    return Gulp.src('./style/**/*.css')
        .pipe(CSS({prefix: 'css_'}))
        .pipe(Rename(function(path){
            path.basename = 'css_'+path.basename;
        }))
        .pipe(Gulp.dest('./app/'));
});

Gulp.task('style', ['css']);

// doT模板
Gulp.task('dot', function() {
    return Gulp.src('./tpl/**/*.html')
        .pipe(Dot({prefix: 'tpl_'}))
        .pipe(Rename(function(path){
            path.basename = 'tpl_'+path.basename;
        }))
        .pipe(Gulp.dest('./app/'));
});

// React模板
Gulp.task('jsx', function () {
    return Gulp.src('./tpl/**/*.jsx')
        .pipe(Jsx())
        .pipe(HyMobileWrapper({prefix: 'tpl_', isModule: true}))
        .pipe(Rename(function(path){
            path.basename = 'tpl_'+path.basename;
        }))
        .pipe(Gulp.dest('./app/'));
});

Gulp.task('tpl', ['dot', 'jsx']);

Gulp.task('watch', function(){
    Gulp.watch('./tpl/**/*.jsx', ['jsx']);
    Gulp.watch('./tpl/**/*.html', ['html']);
    Gulp.watch('./style/**/*.css', ['css']);
});

Gulp.task('default', ['tpl', 'style', 'watch']);