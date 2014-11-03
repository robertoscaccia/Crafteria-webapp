Package.describe({
  summary: "Telescope Crafteria theme",
  version: '0.1.0',
  name: "telescope-theme-crafteria"
});

Package.onUse(function (api) {

  api.use(['telescope-theme-hubble', 'templating', 'telescope-base'], ['client']);

  api.add_files([
  	'lib/client/crafteria.js',
    'lib/client/stylesheets/screen.css',
    'lib/client/templates/nav_title.js',
    'lib/client/templates/nav_title.html',
    'lib/moment-with-locale.min.js',
    'lib/client/templates/crafteria_user_profile.html',
    'lib/client/templates/crafteria_user_profile.js'
    ], ['client']);

});
