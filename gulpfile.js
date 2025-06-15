import path from 'path'
import fs from 'fs'
import {src, dest, watch, series} from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

import terser from 'gulp-terser'
import sharp from 'sharp'
import { glob } from 'glob'

const sass = gulpSass(dartSass);

export function js( done ){
    src('src/js/app.js')
        .pipe(terser()) // Minify JavaScript files
        .pipe(dest('build/js'))

    done()
}

export function css( done ){
    src('src/scss/app.scss', {sourcemaps: true}) //! source scss, code here, sourcemaps generate style code map for navigator
        .pipe(sass({
            style: 'compressed', // compressed style
        }).on('error', sass.logError)) // Show errors in console
        .pipe(dest('build/css',{sourcemaps: '.'})) // destination css file

    done()
}

export function dev(){
    watch('src/scss/**/*.scss', css); // files with .scss extension
    watch('src/js/**/*.js', js); // files with .js extension
    watch('src/img/**/*.{png,jpg}', js); // files with .png and jpg extension
}

// Function to crop images for the gallery, require sharp library
export async function crop(done) {
    const inputFolder = 'src/img/gallery/full'
    const outputFolder = 'src/img/gallery/thumb';
    const width = 250;
    const height = 180;
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true })
    }
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file));
    });
    try {
        images.forEach(file => {
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile) 
                .resize(width, height, {
                    position: 'centre'
                })
                .toFile(outputFile)
        });

        done()
    } catch (error) {
        console.log(error)
    }
}

// Function to process images, require glob library
export async function images(done) {
    const srcDir = './src/img';
    const buildDir = './build/img';
    const images =  await glob('./src/img/**/*{jpg,png}')
    // Filter out directories and only keep image files
    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        imagesProcess(file, outputSubDir);
    });
    done();
}

function imagesProcess(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    // Create output file paths for jpg, webp, and avif formats
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)
    const outputFileAVIF = path.join(outputSubDir, `${baseName}.avif`)
    // define options for image conversion
    const options = { quality: 80 }
    sharp(file).jpeg(options).toFile(outputFile)
    sharp(file).webp(options).toFile(outputFileWebp)
    sharp(file).avif().toFile(outputFileAVIF)
}

export default series( crop, js, css, images, dev );