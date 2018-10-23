const gulp = require('gulp');
const mocha = require('gulp-mocha');
const browserify = require('browserify');
const vinyl = require('vinyl-source-stream');
const runSequence = require('run-sequence');

gulp.task('test', () =>
	gulp.src(['test/test-*.js'], { read: false })
	.pipe(mocha({ reporter: 'nyan' }))
);

gulp.task('browserify', () =>
	browserify('src/index.js', { standalone: 'VerbalAdditionSolver' })
	.transform('babelify')
	.bundle()
	.pipe(vinyl('verbal-addition-solver.js'))
	.pipe(gulp.dest('dist'))
);

gulp.task('minify', () =>
	browserify('src/index.js', { standalone: 'VerbalAdditionSolver' })
	.transform('babelify', { comments: false, presets: [['minify']] })
	.bundle()
	.pipe(vinyl('verbal-addition-solver.min.js'))
	.pipe(gulp.dest('dist'))
);

gulp.task('build', (callback) =>
	runSequence(
		['browserify', 'minify'],
		callback,
	)
);
