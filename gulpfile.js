var gulp = require('gulp');
var runSequence = require('run-sequence');
var compass = require('gulp-compass'),
	plumber = require('gulp-plumber');
var ts = require('gulp-typescript');
var bundler = require('aurelia-bundler');
var browserSync = require('browser-sync');

// SASS/Compass compiler
gulp.task('sass', function (done) {
	if(compass) {
		return gulp.src('./sass/**/*.scss')
			.pipe(plumber({
				errorHandler: function (error) {
					console.log(error.message);
					this.emit('end');
				}
			}))
			.pipe(compass({
				css: 'styles',
				config_file: './sass/compass.rb'
			}));
	}
});


// Typescript Compiler
var tsProject = ts.createProject({
	declaration: false,
	noExternalResolve: true,
	sortOutput: true,
	target: 'ES5',
	module: 'amd',
	noImplicitAny: false,
	removeComments: true,
	emitDecoratorMetadata: true,
	experimentalDecorators: true
});
gulp.task('scripts', function () {
	var tsRoot = gulp.src([
								'./typings/*/**/*.d.ts',
								'./jspm_packages/**/aurelia-*/**/*.d.ts',
							  'src/**/*.ts', 'main.ts'], {base: './'})
		.pipe(ts(tsProject));

	return tsRoot.js.pipe(gulp.dest('.'));
});


// Aurelia Bundle
var config = {
	force: true,
	packagePath: '.',
	bundles: {
		"dist/app": {
			includes: [
				'[main.js]',
				'[./src/**/*.js]',
				'[./src/**/*.html!text]'
			],
			options: {
				inject: true,
				minify: true
			}
		},
		"dist/framework": {
			includes:[
				'./jspm_packages/**/aurelia-ui-framework/**/*.js',
				'./jspm_packages/**/aurelia-ui-framework/**/*.html!text',
				'./jspm_packages/npm/**/aurelia-*.js',
				'./jspm_packages/npm/**/aurelia-validation*/resources/*.js'
			],
			options: {
				inject: true,
				minify: true
			}
		}
	}
};
gulp.task('aurelia:bundle', function () {
	return bundler.bundle(config);
});
gulp.task('aurelia:unbundle', function () {
	return bundler.unbundle(config);
});
gulp.task('aurelia:build', function () {
	return gulp.src(['./index.html', './browserconfig.xml', './manifest.json',
			'./config.js', './Web.config', './jspm_packages/system*',
			'./fonts/**/*', './styles/**/*', './images/**/*', './dist/**/*'], {base: './'})
		.pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
	gulp.watch('./sass/**/*.scss', ['sass']);
	gulp.watch('./src/**/*.ts', ['scripts']);
});

gulp.task('build', function () {
	runSequence('sass', 'scripts');
});

gulp.task('production', function () {
	runSequence('sass', 'scripts', 'aurelia:bundle', 'aurelia:build', 'aurelia:unbundle');
});

gulp.task('serve', ['build'], function (done) {
	browserSync({
		open: false,
		port: 9000,
		server: {
			baseDir: ['.'],
			'middleware': function (req, res, next) {
				res.setHeader('Access-Control-Allow-Origin', '*');
				next();
			}
		}
	}, done);
});

gulp.task('default', function () {
	process.stdout.write('\n');
	process.stdout.write('Available gulp tasks\n');
	process.stdout.write('\n');
	process.stdout.write('watch - Watch changes for SASS and TypeScript files\n');
	process.stdout.write('build - Compile SASS and TypeScript files\n');
	process.stdout.write('serve - Build and start local web-server\n');
	process.stdout.write('production - Bundle aurelia files into distribution folder');
	process.stdout.write('\n');
});
