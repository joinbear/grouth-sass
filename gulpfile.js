const gulp = require('gulp');


//--------------------babel build es6 js file----------------------
const babel = require('gulp-babel');

gulp.task('es6-build', () => {
	return gulp.src('es6/**/*.js')
		.pipe(babel({
			plugins: [
				"transform-strict-mode",
				"transform-es2015-modules-commonjs",
				"transform-es2015-spread",
				"transform-es2015-destructuring",
				"transform-es2015-parameters"
			]
		}))
		.pipe(gulp.dest('app'));
});

gulp.task('watch-es6', ['es6-build'], () => {
	gulp.watch('./es6/**/*.js', ['es6-build'])
});

//------------------css -------------------

const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const rename = require('gulp-rename');


gulp.task('autoprefixer', function () {
	gulp.src('./public/stylesheets/fathers-day.css')
		.pipe(autoprefixer('ios 4', 'android 2.3'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('./public/stylesheets/'))
});

//------------------iconfont build config-------------------

const iconfont    = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const fontName    = 'Icons';
const appName     = 'invite';
const icontPath   = '../sass/apps/'+appName+'/iconfont/_iconfont.scss'


gulp.task('iconfont',() => {
	gulp.src(['./iconfonts/*.svg'])
	.pipe(iconfontCss({
		fontName: fontName,
		formats: ['ttf', 'eot', 'woff','svg'],
		path: './sass/m-mascot/iconfont/_iconfont-tpl.scss',
		targetPath: icontPath,
		fontPath: '../iconfonts/'
	}))
	.pipe(iconfont({
		fontName: fontName
	}))
	.pipe(gulp.dest('./iconfonts/'));
});