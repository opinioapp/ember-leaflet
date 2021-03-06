/* jshint node: true */
'use strict';
var path = require('path');
var mergeTrees = require('broccoli-merge-trees');
var VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: 'ember-leaflet',
  included: function (app) {

    let bowerPath = app.bowerDirectory;
    if (typeof app.bowerDirectory === 'undefined') {
      bowerPath = app.parent.bowerDirectory;
    }
    //import javascript
    app.import(bowerPath + '/leaflet/dist/leaflet-src.js');
    app.import(bowerPath + '/leaflet/dist/leaflet.css');

    var imagesDestDir = '/assets/images';
    app.import(bowerPath + '/leaflet/dist/images/layers-2x.png', {destDir: imagesDestDir});
    app.import(bowerPath + '/leaflet/dist/images/layers.png', {destDir: imagesDestDir});
    app.import(bowerPath + '/leaflet/dist/images/marker-icon-2x.png', {destDir: imagesDestDir})
    app.import(bowerPath + '/leaflet/dist/images/marker-icon.png', {destDir: imagesDestDir});
    app.import(bowerPath + '/leaflet/dist/images/marker-shadow.png', {destDir: imagesDestDir});
  },
  treeForAddonTemplates: function treeForAddonTemplates(tree) {
    var checker = new VersionChecker(this);
    var dep = checker.for('ember', 'bower');

    var baseTemplatesPath = path.join(this.root, 'addon/templates');

    if (dep.lt('2.3.0-beta.1')) {
      var current = this.treeGenerator(path.join(baseTemplatesPath, 'current'))
      var specificVersionTemplate = this.treeGenerator(path.join(baseTemplatesPath, 'lt-2-3'));
      return mergeTrees([current, specificVersionTemplate], {overwrite: true})
    } else {
      return this.treeGenerator(path.join(baseTemplatesPath, 'current'));
    }
  }
};
