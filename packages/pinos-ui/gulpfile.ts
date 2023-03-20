import { resolve } from 'node:path'
import fs from 'fs-extra'
import { dest, src, parallel } from 'gulp'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'

const { existsSync, emptyDir, mkdirSync } = fs

const cssDir = resolve(__dirname, './dist/css')

function ensureEmptyDir(dir: string) {
  existsSync(dir) ? emptyDir(dir) : mkdirSync(dir)
}

function buildStyle() {
  ensureEmptyDir(cssDir)

  const sass = gulpSass(dartSass)

  return src(resolve(__dirname, 'styles/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(dest(cssDir))
}

export default parallel(buildStyle)
