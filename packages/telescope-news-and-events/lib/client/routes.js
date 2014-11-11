Meteor.startup(function () {

  Router.map(function() {

    this.route('news', {
      path: '/news'
    });

    this.route('events', {
      path: '/events'
    });

  });

});

// Insert the 'More' menu item to the secondary nav.
if (secondaryNav.indexOf('moreMenu') < 0)
  secondaryNav.splice(4, 0, 'moreMenu');

if (typeof moreMenuNav == "undefined")
  moreMenuNav = [];
moreMenuNav.push({
  route: 'news',
  label: 'News'
}, {
  route: 'events',
  label: 'Events'
});
