const
    gulp      = require('gulp'),
    scss        = require('gulp-sass'),
    babel       = require('gulp-babel'),
    uglify      = require('gulp-uglify'),
    cleanCss    = require('gulp-clean-css'),
    useref      = require('gulp-useref'),
    gulpIf      = require('gulp-if'),
    browserSync = require('browser-sync').create();

gulp.task('scss', () => {
   return gulp.src('app/scss/**/*.scss')
       .pipe(scss())
       .pipe(gulp.dest('app/css'))
       .pipe(browserSync.stream())
});

gulp.task('es6', () => {
    return gulp.src('app/js/pre-compiled/*.js')
        .pipe(babel({ presets: ['es2015']} ))
        .pipe(gulp.dest('app/js'))
});

gulp.task('browsersync', () => {
   browserSync.init({
       server: {
           baseDir: 'app'
       }
   });
});

gulp.task('serve', ['browsersync', 'scss', 'es6'], () => {
   gulp.watch('app/scss/**/*.scss', ['scss']);
   gulp.watch('app/*.html', browserSync.reload);
   gulp.watch('app/js/pre-compiled/*.js', ['es6', browserSync.reload]);
});

gulp.task('production', () => {
   gulp.src('app/*.html')
       .pipe(useref())
       .pipe(gulpIf('*.js', uglify()))
       .pipe(gulpIf('*.css', cleanCss()))
       .pipe(gulp.dest('dist'))
});