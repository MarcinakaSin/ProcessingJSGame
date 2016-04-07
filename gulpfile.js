"use strict";

var gulp 	= require('gulp'),
  	concat 	= require('gulp-concat'),
  	maps	= require('gulp-sourcemaps'),
  	del		= require('del');

  gulp.task("concatScripts", function() {
  // Using 'return' makes sure that this process finishes before the next one starts.
  // Provides an array of JS files to concat.
  return gulp.src([
      'rebuild/tile.js',
      'rebuild/mapspace.js',
      'rebuild/maplevel.js',
      'rebuild/character.js',
      'rebuild/player.js',
      'rebuild/game.js'
      ])
  // Initialize source mapping chain. Accepts options.
  .pipe(maps.init())
  // Specifies what file name to concat the rest of the JS files under.
  .pipe(concat('app.js'))
  // Sets destination path for js map file.  Accepts options.
  .pipe(maps.write('./'))
  // Sets destination path for concatinated js file.  
  .pipe(gulp.dest('js'));
});

gulp.task('watchFiles', function() {
  // Uses gulp's 'watch' method to watch changes in the JS files and call the concatScripts task.
  gulp.watch('rebuild/**.js', ['concatScripts']);
});

// Sets the 'clean' task to delete compiled code.
gulp.task('clean', function() {
  // Deletes the dist directory and the css file as well as the files within the JS globbing pattern.
  del(['js/app*.js*']);
});

// Sets the 'serve' task to run 'watchFiles' which watches changes on both the Sass and JS files.
gulp.task('serve', ['watchFiles']);

// Runs the 'clean' task before running the 'build' task. 
// Allowing the default task to delete all existing versions of the generated files before generating new versions.
gulp.task("default", ["clean"], function() {
  // Starts the build task after the 'clean' task has completed.
  gulp.start('concatScripts');
});