var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

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