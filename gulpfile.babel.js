'use strict';

import gulp from 'gulp';
import clean from 'gulp-clean';
import eslint from 'gulp-eslint';
import fsp from 'fs-promise';
import ghPages from 'gulp-gh-pages';
import glob from 'glob';
import htmlmin from 'gulp-htmlmin';
import os from 'os';
import rp from 'request-promise';
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
                    origin: "git@github.com:moshner/automateyourlife.org.git"
                }));
    });

    gulp.task('dev-deploy', () => {
        return gulp.src('./dist/**/*')
                .pipe(ghPages({
                    origin: "git@github.com:chimericdream/dev.automateyourlife.org.git"
                }));
    });

    gulp.task('dev-build', ['default', 'clean-dev'], () => {
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

    gulp.task('jekyll', (cb) => {
        var spawn = require('child_process').spawn;
        var jekyll = spawn(jekyll_bin, ['build'], {stdio: 'inherit'});

        jekyll.on('exit', (code) => {
            cb(code === 0 ? null : `ERROR: Jekyll process exited with code: ${code}`);
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

    gulp.task('generate-forum-post', (cb) => {
        return glob('src/_posts/*.md', (err, files) => {
            files.reverse();
            processFile(files[0], cb);
        });
    });

    function processFile(file, cb) {
            let file_name = file.replace('src/_posts/', '');
            let re = /^(\d{4})-(\d{2})-(\d{2})-(.*)\..{2,3}$/i;
            let file_attrs = re.exec(file_name);

            var file_contents = '';
            var author_key = '';

            fsp.readFile(file)
                    .then((file_buffer) => {
                        file_contents = file_buffer.toString();

                        let author_re = /^---([\r\n](?:.|\r|\n)*?)author: "([^"]+)"([\r\n](?:.|\r|\n)*?)---$/gm;
                        author_key = author_re.exec(file_contents)[2];

                        return fsp.readFile('src/_data/authors.json');
                    })
                    .then((author_file_buffer) => {
                        let authors = JSON.parse(author_file_buffer.toString());

                        let title_re = /^---([\r\n](?:.|\r|\n)*?)title: "([^"]+)"([\r\n](?:.|\r|\n)*?)---$/gm;
                        let title = title_re.exec(file_contents)[2];

                        let permlink_re = /^---([\r\n](?:.|\r|\n)*?)permalink: "([^"]+)"([\r\n](?:.|\r|\n)*?)---$/gm;
                        let permalink = permlink_re.exec(file_contents);

                        let post_url = 'http://automateyourlife.org';

                        if (permalink === null) {
                            post_url += `/blog/${file_attrs[1]}/${file_attrs[2]}/${file_attrs[3]}/${file_attrs[4]}/`;
                        } else {
                            post_url += permalink[2];
                        }
                        return rp({
                            method: 'POST',
                            uri: 'http://api.automateyourlife.org/jekyll-to-forum/',
                            body: {
                                'post_url': post_url,
                                'title': title,
                                'author': authors[author_key]['name']
                            },
                            json: true
                        });
                    })
                    .then((resp) => {
                        let forum_link = resp.forum_link;
                        let new_contents = file_contents.replace(/^---([\r\n](?:.|\r|\n)*?)---$/gm, '---$1\nforum_link: "' + forum_link + '"\n---');
                        return fsp.writeFile(file, new_contents);
                    })
                    .then(() => {
                        cb();
                    })
                    .catch((err) => {
                        console.log(err);
                        cb(err);
                    });
    }

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
