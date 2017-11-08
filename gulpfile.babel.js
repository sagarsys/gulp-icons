import config from './gulpfile.config';
import consolidate from 'gulp-consolidate';
import del from 'del';
import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';
import iconFont from 'gulp-iconfont';

// ################################################# \\

const runTimestamp    = Math.round(Date.now()/1000);

// ################# ICONTASK ################### \\

gulp.task('iconFontTask', function(){
	return gulp.src(config.icon.ALL)
	  .pipe(iconFont({
		fontName: 'icons',
		appendUnicode: false,
		formats: ['ttf', 'eot', 'woff', 'svg'],
		centerHorizontally: true,
		normalize: true,
		timestamp: runTimestamp
	  }))
	  .on('glyphs', function(glyphs) {
		gulp.src(config.icon.TEMPLATE)
		  .pipe(consolidate('lodash', {
			glyphs: glyphs,
			fontName: 'icons',
			fontPath: '../fonts/icons/',
			className: 'ps-icon'
		  }))
		  .pipe(gulp.dest(config.icon.GENERATED_SCSS));
	  })
	  .pipe(gulp.dest(config.icon.DEST))
  });
  
// ################# CLEANTASK ################### \\

gulp.task('cleanBuild', function () {
	return del([config.icon.DEST], { force: true })
		.then(paths => {
			console.log('Files and folders that would be deleted:\n', paths.join('\n'));
		});
});

// ################################################# \\

gulp.task('build', gulpSequence('cleanBuild', 'iconFontTask'));

gulp.task('default', gulpSequence('build'));