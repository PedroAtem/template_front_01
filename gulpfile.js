var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
// prod
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var es = require('event-stream');
var htmlreplace = require('gulp-html-replace');
var replaceImage = require('gulp-replace-image-src');

// reload task
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// preparando o browser para a sincronização
gulp.task('browser-sync', function() {
    browserSync.init(['css/*.css', 'js/*.js'], {
        server: {
            baseDir: './'
        }
    });
});

gulp.task('dev', function() {
    // observando arquivos html, js e css
    gulp.watch(['*.html', 'static/assets/js/*.js', 'static/assets/css/*.css'], ['bs-reload']);
	return runSequence(['browser-sync']);
});

gulp.task('clean', function() {
	return gulp.src('dist/')
	.pipe(clean());
});

gulp.task('jshint', function() {
	return gulp.src('static/assets/js/**/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

gulp.task('uglify', ['clean'], function() {
	return gulp.src(['static/assets/js/puremask.js', 'static/assets/js/**/*.js'])
	.pipe(concat('scripts.js'))
	.pipe(uglify())
	.pipe(concat('scripts.min.js'))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('htmlmin', function() {
	return gulp.src('index.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(htmlreplace({
        'css': 'css/styles.min.css',
        'js': 'js/scripts.min.js'
    }))
    .pipe(replaceImage({
		prependSrc : 'img/',
		keepOrigin : false
	}))
	.pipe(gulp.dest('dist/'))
});

gulp.task('cssmin', function() {
	return gulp.src('static/assets/css/**/*.css')
	.pipe(cleanCSS())
	.pipe(concat('styles.min.css'))
	.pipe(gulp.dest('dist/css'))
});

gulp.task('copyimg', function () {
	return gulp.src('static/assets/img/**/*.png')
	.pipe(gulp.dest('dist/img'));
});

gulp.task('copyfont', function () {
	return gulp.src('static/assets/font/**/*.ttf')
	.pipe(gulp.dest('dist/font'));
});

gulp.task('prod', function() {
    return runSequence('clean', ['jshint', 'uglify', 'htmlmin', 'cssmin', 'copyimg', 'copyfont']);
});