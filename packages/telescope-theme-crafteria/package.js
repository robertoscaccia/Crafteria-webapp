Package.describe({
  summary: "Telescope Crafteria theme",
  version: '0.1.0',
  name: "telescope-theme-crafteria"
});

Package.onUse(function (api) {

  api.use(['telescope-theme-hubble'], ['client']);

  api.add_files([
    'lib/client/stylesheets/screen.css',
    ], ['client']);

});
