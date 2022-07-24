import fs, { appendFile } from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
  // Finding font files .otf
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'FONTS',
        message: "Error: <%= error.message %>"
      })
    ))
    // Convert to .ttf
    .pipe(fonter({
      formats: ['ttf']
    }))
    // Load to source folder
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

// Now we will convert from .ttf to .woff and .woff2

export const ttfToWoff = () => {
  // Finding font files .ttf
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'FONTS',
        message: "Error: <%= error.message %>"
      })
    ))
    // Convert to .woff
    .pipe(fonter({
      formats: ['woff']
    }))
    // Load to build folder
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    // Find .ttf files
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    // Convert to .woff2
    .pipe(ttf2woff2())
    // Load to build folder
    .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}

export const fontsStyle = () => {
  // Style file to connect fonts
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
  // Checking if font files exist
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      // Checking if style file exist to connect fonts
      if (!fs.existsSync(fontsFile)) {
        // If file does not exist, creating it
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          // Write connection of fonts file to style file
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
            if (fontWeight.toLowerCase() === 'thin') {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === 'extralight') {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === 'light') {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 700;
            } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === 'black') {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(fontsFile,`@font-face{\n\tfont-family:${fontName};\n\tfont-display:swap;\n\tsrc: url("../fonts/${fontFileName}.woff2")format("woff2"),url("../fonts/${fontFileName}.woff")format("woff");\n\tfont-weight:${fontWeight};\n\tfont-style:normal;\n}\r\n`,cb);
        }
      }
    } else {
      // If file exists, display message
      console.log("file scss/fonts already exists. For refresh you will need to delete it!")
    }
  }
});

  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() { }
  
}