import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import {src, dest, watch} from 'gulp';

const sass = gulpSass(dartSass);

export function css(done){
    src('src/scss/app.scss')
        .pipe(sass({
            includePaths: ['scss']
        }).on('error', sass.logError))
        .pipe(dest('src/css'))
    done();
}


export function dev(){
    watch('src/scss/**/*.scss', css);
}