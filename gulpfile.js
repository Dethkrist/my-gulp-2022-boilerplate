// Main module
import gulp from "gulp";
// Import paths
import { path } from "./gulp/config/path.js";
// Import common plugins
import { plugins } from "./gulp/config/plugins.js";


// Set values to global variable
global.app = {
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

// Create watcher to detect changes in our files
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

// Connecting parallel tasks for copying files and html
const mainTasks = gulp.parallel(copy, html, scss, js, images);
const watchServer = gulp.parallel(watcher, server);
// Creating a task scenarios
const dev = gulp.series(reset, mainTasks, watchServer);

// Completing task as default
gulp.task('default', dev);

