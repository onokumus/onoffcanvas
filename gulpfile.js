const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const header = require('gulp-header');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

// using data from package.json
const pkg = require('./package.json');
const banner = [
    '/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''
].join('\n');

gulp.task('js', () => {
    return gulp.src('./src/*.js')
    .pipe(concat('onoffcanvas.js'))
    .pipe(babel())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./dist/'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('css', () => {
    return gulp.src('./src/*.css')
    .pipe(concat('onoffcanvas.css'))
    .pipe(autoprefixer())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./dist/'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cssnano())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['js', 'css'], ()=>{
  console.log('finished');
});
