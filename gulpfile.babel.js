'use strict';

import gulp from 'gulp';
import clean from 'gulp-clean';
import eslint from 'gulp-eslint';
import ghPages from 'gulp-gh-pages';
import glob from 'glob';
import htmlmin from 'gulp-htmlmin';
import os from 'os';
import sass from 'gulp-sass';
import through from 'through2';
import uglify from 'gulp-uglify';

{
    let curr_os = os.platform();
    let jekyll_bin = 'jekyll';

    if (curr_os === 'win32') {
        jekyll_bin = 'jekyll.bat';
    }

    gulp.task('default', ['css', 'fonts', 'html', 'images', 'js']);

    gulp.task('deploy', () => {
        return gulp.src('./dist/**/*')
                .pipe(ghPages({
                    remoteUrl: "git@github.com:moshner/automateyourlife.org.git"
                }));
    });

    gulp.task('dev-deploy', () => {
        return gulp.src('./dist/**/*')
                .pipe(ghPages({
                    remoteUrl: "git@github.com:chimericdream/dev.automateyourlife.org.git",
                    origin: "dev"
                }));
    });

    gulp.task('dev-site', ['default', 'clean-dev'], () => {
        return gulp.src('dist/**/*')
                .pipe(gulp.dest('_site'));
    });

    gulp.task('css', ['clean-css'], () => {
        return gulp.src('src/assets/sass/*.scss')
                .pipe(sass())
                .pipe(gulp.dest('dist/assets/styles'));
    });

    gulp.task('clean-dev', () => {
        return gulp.src('_site')
                .pipe(clean());
    });

    gulp.task('fonts', ['clean-fonts'], () => {
        return gulp.src('node_modules/bootstrap-sass/assets/fonts/**/*')
                .pipe(trimlines({
                    leading: false,
                    filePattern: /^.*\.svg/
                }))
                .pipe(gulp.dest('dist/assets/fonts'));
    });

    gulp.task('html', ['jekyll'], () => {
        return gulp.src('build-mid/**/*.html')
                .pipe(htmlmin({collapseWhitespace: true}))
                .pipe(gulp.dest('dist'))
    });

    gulp.task('images', ['clean-images'], () => {
        return gulp.src('src/assets/images/**/*')
                .pipe(gulp.dest('dist/assets/images'));
    });

    gulp.task('js', ['clean-js'], () => {
    });

    gulp.task('clean-css', () => {
        return gulp.src('dist/assets/styles')
                .pipe(clean());
    });

    gulp.task('clean-fonts', () => {
        return gulp.src('dist/assets/fonts')
                .pipe(clean());
    });

    gulp.task('jekyll', (gulpCallBack) => {
        var spawn = require('child_process').spawn;
        var jekyll = spawn(jekyll_bin, ['build'], {stdio: 'inherit'});

        jekyll.on('exit', (code) => {
            gulpCallBack(code === 0 ? null : `ERROR: Jekyll process exited with code: ${code}`);
        });
    });

    gulp.task('clean-images', () => {
        return gulp.src('dist/assets/images')
                .pipe(clean());
    });

    gulp.task('clean-js', () => {
        return gulp.src('dist/assets/scripts')
                .pipe(clean());
    });

    gulp.task('generate-forum-post', () => {
        glob('src/_posts/*.md', (err, files) => {
            files.reverse();
            console.log(files[0]);
        });
    });

    /**
     * Based on the `gulp-trimlines` NPM module, with an added option to filter
     * files passed through by file names matching a particular pattern.
     * See: https://github.com/dougmartin/gulp-trimlines
     */
    function trimlines(options) {
        var leadingPattern, trailingPattern, patterns, regex;

        // ensure the option defaults
        options = options || {};
        options.leading = options.hasOwnProperty('leading') ? !!options.leading : true;
        options.trailing = options.hasOwnProperty('trailing') ? !!options.trailing : true;
        options.leadingPattern = options.leadingPattern || '[ \\t]+';
        options.trailingPattern = options.trailingPattern || '[ \\t]+';
        options.encoding = options.encoding || 'utf8';
        options.filePattern = options.filePattern || /^.*$/;

        // create the regex
        if (options.pattern) {
            regex = new RegExp(options.pattern, 'gm');
        } else {
            patterns = [];
            if (options.leading) {
                patterns.push('^' + options.leadingPattern);
            }
            if (options.trailing) {
                patterns.push(options.trailingPattern + '$');
            }
            regex = patterns.length > 0 ? new RegExp(patterns.join('|'), 'gm') : null;
        }

        return through.obj(function(file, encoding, done) {
            if (regex && file.relative.search(options.filePattern) !== -1) {
                file.contents = new Buffer(file.contents.toString(options.encoding).replace(regex, ""));
            }
            this.push(file);
            return done();
        });
    };
}
