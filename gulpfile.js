const gulp = require('gulp');
const scss = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('scss', () => {
   return gulp.src('app/scss/**/*.scss')
       .pipe(scss())
       .pipe(gulp.dest('app/css'))
       .pipe(browserSync.stream())
});

gulp.task('browsersync', () => {
   browserSync.init({
       server: {
           baseDir: 'app'
       }
   });
});

gulp.task('serve', ['browsersync'], () => {
   gulp.watch('app/scss/**/*.scss', ['scss']);
   gulp.watch('app/*.html', browserSync.reload);
   gulp.watch('app/js/**/*.js', browserSync.reload);
});