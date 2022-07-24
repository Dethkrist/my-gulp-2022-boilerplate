
// import fileinclude from "gulp-file-include"; //This is for HTML files
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import pug from "gulp-pug";

export const html = () => {
  return app.gulp.src(app.path.src.html)
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: "HTML",
      message: "Error: <%= error.mmesage %>",
    })
  ))
    // .pipe(fileinclude())  //This is for HTML files
    .pipe(pug({ //This all is for PUG files
      //HTML minification, and prettify
      pretty: true,
      //Show in terminal which file was handled
      verbose: true,
    }))
    .pipe(app.plugins.replace(/@img\//g, 'img/'))
    .pipe(app.plugins.if(
      app.isBuild,
      webpHtmlNosvg()
    ))
    .pipe(
      app.plugins.if(
        app.isBuild,
        versionNumber({
          'value': '%DT%',
          'append': {
            'key': '_v',
            'cover': 0,
            'to': [
              'css',
              'js'
            ]
          },
          'output': {
            'file': 'gulp/version.json',
        }
      })
    )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream());
}


