var gulp        = require('gulp');
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var jshint      = require('gulp-jshint');
var uglify      = require('gulp-uglify');
var minifyCss   = require('gulp-minify-css');
var browserSync = require('browser-sync').create();
var clean       = require('gulp-clean');
var htmlmin     = require('gulp-htmlmin');
var reload      = browserSync.reload;

var jsfiles = [
    '!src/assets/js/main.js'
    ,'node_modules/jquery/dist/jquery.min.js'
    ,'node_modules/bootstrap/dist/js/bootstrap.min.js'
    ,'node_modules/jquery-mask-plugin/dist/jquery.mask.min.js'
    ,'src/assets/js/vendor/*.js'
    ,'src/assets/js/*.js'
];

gulp.task('watch', function(){
	gulp.watch('src/assets/js/*.js', ['js:watch']);
    gulp.watch('src/assets/css/*.scss', ['sass:watch']);
})

gulp.task('sass:watch', function () {
 	return gulp.src('src/assets/css/main.scss')
    	.pipe(sass().on('error', sass.logError))
    	.pipe(gulp.dest('src/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('js:watch', function () {
	return gulp.src(jsfiles)
	.pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('src/assets/js'));
});

gulp.task('server',['sass:watch','js:watch'], function () {
    browserSync.init({
        server: {
            baseDir: "./src",
            index: "index.htm"
        }
    });

    gulp.watch("src/assets/js/*.js", ['js:watch']);
    gulp.watch("src/assets/css/*.scss", ['sass:watch']);
    gulp.watch("src/**/*").on("change", reload);
});

gulp.task('js',['clean'],function(){
    return gulp.src('src/assets/js/main.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'));
})

gulp.task('css',['clean'],function(){
    return gulp.src('src/assets/css/main.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/assets/css'))
})

gulp.task('clean',function(){
    return gulp.src('dist')
        .pipe(clean());
})

gulp.task('copy',['clean'], function () {
    return gulp.src(['!src/assets/css','!src/assets/js','src/**/*'])
        .pipe(gulp.dest('dist'));
});

// gulp.task('htmlmin',['clean'], function() {
//   return gulp.src('src/*.htm')
//     .pipe(htmlmin({collapseWhitespace: true}))
//     .pipe(gulp.dest('dist'));
// });

gulp.task('default',['sass:watch','js:watch','clean','js','css','copy']);