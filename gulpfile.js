const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const header = require('gulp-header');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rtlcss = require('rtlcss');
const flexbugs = require('postcss-flexbugs-fixes');
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

const browsers = [
    'Chrome >= 35',
    'Firefox >= 38',
    'Edge >= 12',
    'Explorer >= 10',
    'iOS >= 8',
    'Safari >= 8',
    'Android 2.3',
    'Android >= 4',
    'Opera >= 12'
];

gulp.task('js', () => {
    return gulp.src('./src/*.js')
    .pipe(concat('onoffcanvas.js'))
    .pipe(babel())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./dist/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('css', () => {
    return gulp.src('./src/*.scss')
    .pipe(sass({
       outputStyle: 'expanded'
     }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({browsers: browsers}),
      flexbugs()
    ]))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./dist/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(postcss([cssnano({
      zindex: false,
      reduceTransforms: false
    })]))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./dist/'));
});

/**
 * Defines the list of resources to watch for changes.
 */
gulp.task('watch', () =>{
  gulp.watch(['src/**/*.js'], ['js']);
  gulp.watch(['src/**/*.scss'], ['css']);
});



gulp.task('default', ['js', 'css']);
