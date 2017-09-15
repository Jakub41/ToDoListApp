const gulp = require('gulp'),
    webpack = require('webpack-stream'),
    webpackConfig = require('./webpack.config.js'),
    webpackProdConfig = require('./webpack.production.config.js'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoPrefixer = require('gulp-autoprefixer'),
    del = require('del'),
    path = require('path'),
    webserver = require('gulp-webserver');


gulp.task(function clean(done) {
    return del(path.join('public', '/*'), { force: true }, done);
});

gulp.task(function copy() {

    gulp.src([
            'node_modules/purecss/build/pure-min.css',
            'node_modules/noty/lib/noty.css',
            'node_modules/font-awesome/css/font-awesome.min.css',
            'node_modules/@fengyuanchen/datepicker/dist/datepicker.min.css'
        ])
        .pipe(gulp.dest('public/css'));

    gulp.src([
            'src/fonts/*', 'node_modules/font-awesome/fonts/fontawesome-webfont.woff2'
        ])
        .pipe(gulp.dest('public/fonts'));

    return gulp.src(['src/index.html'])
        .pipe(gulp.dest('public'));
});

gulp.task(function styles() {
    return gulp.src(['src/scss/main.scss'])
        .pipe(plumber({
            handleError: function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'))
});

gulp.task(function js() {
    return gulp.src('src/index.js')
        .pipe(plumber({
            handleError: function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('public/js/'));
});

gulp.task(function jsProd() {
    return gulp.src('src/index.js')
        .pipe(webpack(webpackProdConfig))
        .pipe(gulp.dest('public/js/'));
});

gulp.task('webserver', function() {
    gulp.src('public')
        .pipe(webserver());
});

gulp.task('default',
    gulp.series('clean', 'copy', 'styles', 'js', 'webserver', function bindWatchers(done) {
        const sassWatcher = gulp.watch('src/scss/**/*.scss', gulp.series('styles'));
        const jsWatcher = gulp.watch(['src/app/**/*.js', 'src/index.js', 'src/app/**/*.html'], gulp.series('js'));
    })
);

gulp.task('prod', gulp.series('clean', 'copy', 'styles', 'jsProd'));