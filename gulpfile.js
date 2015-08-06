var gulp  = require('gulp'),
    watch = require("gulp-watch"),
    babel = require("gulp-babel"),
    shell = require('gulp-shell');

var paths = {
  src: 'src/**/*.js',
  dstlib: 'dist/lib', 
  dist: 'dist/',
  watch: 'src/**',
  distw: 'dist/**'
}

var babelCompilerOptions = {
  modules: 'system'
};

gulp.task('src', function () {
    return gulp.src(paths.src)
        .pipe(babel())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('jspm-link', shell.task([
  'jspm link jspm:riot-page@dev -y'
]))

gulp.task('watch', function(){
  gulp.watch(paths.watch, ['src'])
})

gulp.task('watch_dist', function(){
  gulp.watch(paths.distw, ['jspm-link'])
})

gulp.task('default', ['watch']);
