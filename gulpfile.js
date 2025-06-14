import {src, dest, watch, series} from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass);

export function js( done ){
    src('src/js/app.js')
        .pipe(dest('build/js'))

    done()
}

export function css( done ){
    src('src/scss/app.scss', {sourcemaps: true}) //! source scss, code here, sourcemaps generate style code map for navigator
        .pipe(sass().on('error', sass.logError)) // Show errors in console
        .pipe(dest('build/css',{sourcemaps: '.'})) // destination css file

    done()
}

export function dev(){
    watch('src/scss/**/*.scss', css); // files with .scss extension
    watch('src/js/**/*.js', js); // files with .js extension
}

export default series(js, css);