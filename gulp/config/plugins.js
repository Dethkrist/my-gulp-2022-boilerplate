import replace from "gulp-replace"; //Search and replace
import plumber from "gulp-plumber"; //Error handling
import notify from "gulp-notify"; //Messages(Hints)
import browserSync from "browser-sync"; //Dev server
import newer from "gulp-newer"; //Checking update of images
import ifPlugin from "gulp-if"; // if statement

export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browserSync: browserSync,
  newer: newer,
  if: ifPlugin,
}