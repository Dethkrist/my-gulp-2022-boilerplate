// Main module
import gulp from "gulp";
// Import paths
import { path } from "./gulp/config/path.js";
// Import common plugins
import { plugins } from "./gulp/config/plugins.js";


// Set values to global variable
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins,
}

// Import tasks
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

// Create watcher to detect changes in our files
function watcher() {
  gulp.watch(path.watch.files, copy); // if you want to instant send changes to FTP, replace copy to "gulp.series(html,ftp)"
  gulp.watch(path.watch.html, html); // if you want to instant send changes to FTP, replace html to "gulp.series(html,ftp)"
  gulp.watch(path.watch.scss, scss); // if you want to instant send changes to FTP, replace scss to "gulp.series(html,ftp)"
  gulp.watch(path.watch.js, js); // if you want to instant send changes to FTP, replace js to "gulp.series(html,ftp)"
  gulp.watch(path.watch.images, images); // if you want to instant send changes to FTP, replace images to "gulp.series(html,ftp)
}

export { svgSprive }

// Font processing
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Connecting parallel tasks for copying files and html
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));
const watchServer = gulp.parallel(watcher, server);
// Creating a task scenarios
const dev = gulp.series(reset, mainTasks, watchServer);
const build = gulp.series(reset, mainTasks); //It's for build, we don't need watcher here, and server too
const deployZip = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

export {dev};
export {build};
export {deployZip};
export {deployFTP};

// Completing task as default
gulp.task('default', dev);

