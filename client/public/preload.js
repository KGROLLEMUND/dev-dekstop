// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge } = require("electron");
const fs = require("fs");
const path = require("path");

// Expose the `fs` and `path` modules to the renderer process
contextBridge.exposeInMainWorld("fs", {
  readFileSync: (path) => {
    return fs.readFileSync(path);
  },
});

contextBridge.exposeInMainWorld("path", path);
// As an example, here we use the exposeInMainWorld API to expose the browsers
// and node versions to the main window.
// They'll be accessible at "window.versions".
process.once("loaded", () => {
  contextBridge.exposeInMainWorld("versions", process.versions);
});