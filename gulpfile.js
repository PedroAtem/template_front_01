var gulp = require('gulp');

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
    gulp.watch(['*.html', 'assets/js/*.js', 'assets/css/*.css'], ['bs-reload']);
	return runSequence(['browser-sync']);
});