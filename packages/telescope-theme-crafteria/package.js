Package.describe({
  summary: "Telescope Crafteria theme",
  version: '0.1.0',
  name: "telescope-theme-crafteria"
});

Package.onUse(function (api) {

  api.use([
    'telescope-theme-hubble', 
    'templating', 
    'telescope-base', 
    'aldeed:simple-schema', 
    'telescope-i18n', 
    'underscore',
    'telescope-lib'
    ], ['client', 'server']);

  api.add_files(['lib/news.js', 'lib/events.js'], ['client', 'server']);

  api.add_files([
  	'lib/client/templates/crafteria.js',
    'lib/client/routes.js',
    'lib/client/invite.js',
    'lib/client/stylesheets/screen.css',
    'lib/client/templates/nav_title.js',
    'lib/client/templates/nav_title.html',
    'lib/moment-with-locale.min.js',
    'lib/client/templates/crafteria_user_profile.html',
    'lib/client/templates/crafteria_user_profile.js',
    'lib/client/templates/more_nav_dropdown.html',
    'lib/client/templates/news_page.html',
    'lib/client/templates/news_page.js',
    'lib/client/templates/edit_news.html',
    'lib/client/templates/edit_news.js',
    'lib/client/templates/edit_events.html',
    'lib/client/templates/edit_events.js',
    'lib/client/templates/events_page.html',
    'lib/client/templates/events_page.js',
    'lib/client/templates/crafteria_newsletter_banner.html',
    'lib/client/templates/crafteria_posts_daily.html',
    'lib/client/templates/crafteria_posts_daily.js',
    'lib/client/templates/crafteria_search.html',
    'lib/client/templates/crafteria_user_edit.html',
    'lib/client/templates/crafteria_notification_menu.html',
    'lib/client/templates/crafteria_admin_menu.html',
    'lib/client/templates/faq_page.html',
    'lib/client/templates/faq_page.js',
    'translations.js'
    ], ['client']);

  

  api.add_files(['lib/server/publications.js', 'lib/server/posts.js'], ['server']);

  api.export(['Events', 'News', 'EventCategories', 'storeInvite', 'postsDaily']);

});
