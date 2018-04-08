var browser_sync = require('browser-sync');
var gulp = require('gulp');
var scss = require('gulp-sass');
var del = require('del');

gulp.task('TestTask', function(){
    console.log('I am working!!!');
});

gulp.task('def', function(){
    return gulp.src('created_files/**/*.*')
                .on('data', function(file){console.log(file);})
                .pipe(gulp.dest('copy_files'));
})

gulp.task('clean', function(){
    return del('dest');
})

gulp.task('serv', function(){
    browser_sync.init({
        server:'dest'
    });
    browser_sync.watch('dest/**/*.*').on('change', browser_sync.reload);    
})

gulp.task('scss', function(){
    return gulp.src('./src/style/**/*.scss')
    .pipe(scss().on('error', scss.logError))
    .pipe(gulp.dest('dest/style'));
})

gulp.task('html', function(){
    return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('dest'));
})

gulp.task('js', function(){
    return gulp.src('./src/js/**/*.js')
    .pipe(gulp.dest('dest/js'));
})

gulp.task('build', gulp.series('clean', 
    gulp.parallel('scss', 'html', 'js')))

gulp.task('watch', function(){
    gulp.watch('src/style/**/*.scss', gulp.series('scss'));
    gulp.watch('src/*.html', gulp.series('html'));
    gulp.watch('src/js/**/*.js', gulp.series('js'));
})    

gulp.task('default', gulp.series('build', gulp.parallel('watch', 'serv')));


