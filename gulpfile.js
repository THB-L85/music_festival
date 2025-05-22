import {src, dest, watch} from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass);

export function css( done ){
    src('src/scss/app.scss') // source scss, code here
        .pipe(sass().on('error', sass.logError)) // Show errors in console
        .pipe(dest('build/css')) // destination css file

    done()
}

export function dev(){
    watch('src/scss/**/*.scss', css); // files with .scss extension
}