Package.describe({summary: "Telescope news and events package"});

Package.onUse(function (api) {

  api.use(['telescope-lib', 'telescope-base'], ['client', 'server']);

  api.use([
    'jquery',
    'underscore',
    'templating',
    'iron:router'
  ], 'client');

  // api.add_files(['lib/news.js'], ['client', 'server']);

  // api.add_files(['lib/client/routes.js'], ['client']);

  // api.add_files(['lib/search.js'], ['client', 'server']);

  api.add_files([
    'lib/client/routes.js',
    'lib/client/views/nav/more_menu.html',
    'lib/client/views/nav/more_menu.js',
    'lib/client/views/nav/more_menu_item.html',
    'lib/client/views/nav/more_menu_item.js'
    ], ['client']);

  // api.add_files([
  //   'lib/server/log_search.js',
  //   'lib/server/publications.js'
  //   ], ['server']);

  api.export(['moreMenuNav']);
});