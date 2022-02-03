const gulp = require('gulp');

// Api
const { series,  watch} = require('gulp');

// Plugins
const sass = require('gulp-sass')(require('sass'));
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');


/* Production */
function buildSass() {
    return gulp.src('src/assets/sass/*.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('dist/assets/css'));
}

function buildHtmlmin() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
}

function buildJs() {
    return gulp.src(['src/assets/js/components/*.js', 'src/assets/js/views/*.js'])
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'));
}

function moveFiles() {
    var filesToMove = [
        'src/assets/img/*.*',
    ];

    return gulp.src(filesToMove)
    .pipe(gulp.dest('dist/assets/img'));
}

/* Development */
function developingJs() {
    return gulp.src(['src/assets/js/components/*.js', 'src/assets/js/views/*.js'])
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('dist/assets/js'));
}

/* Watch */
function observer() {
    watch('src/*.html', buildHtmlmin)
    watch('src/assets/img/*.*', moveFiles)
    watch(['src/assets/sass/**'], buildSass)
    watch('src/assets/js/**/*.js', developingJs)
}

// exports.sass = buildSass;
exports.build = series(buildSass, buildJs, buildHtmlmin, moveFiles);
exports.start = series(buildSass, developingJs, buildHtmlmin, moveFiles, observer);

