const gulp = require('gulp');
const scss = require('gulp-sass');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

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