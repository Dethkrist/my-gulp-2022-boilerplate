// Get our project name folder
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

// Set pathes to build folder and source folder
const buildFolder = `./dist`; //can also use rootFolder if you want
const srcFolder = `./src`;

export const path = {
  build: {
    images: `${buildFolder}/img`,
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    files: `${buildFolder}/files/`
  }, //build iles path
  src: {
    images: `${srcFolder}/img/**/*.{jpg, jpeg, png, gif, webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    js: `${srcFolder}/js/index.js`,
    scss: `${srcFolderssss}/scss/style.scss`,
    html: `${srcFolder}/*.pug`, //If you use Pug, change to *.pug, if HTML, then .html
    files: `${srcFolder}/files/**/*.*`,
  }, //source files path
  watch: {
    images: `${srcFolder}/img/**/*.{jpg, jpeg, png, gif, webp, ico, svg}`,
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolder}/**/*.pug`, //If you use Pug, change to *.pug
    files: `${srcFolder}/files/**/*.*`
  }, //files and folders, is needed to watched by gulp
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: ``,
}