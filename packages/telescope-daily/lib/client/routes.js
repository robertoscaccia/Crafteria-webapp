var daysPerPage = 5;

var coreSubscriptions = new SubsManager({
  // cache recent 50 subscriptions
  cacheLimit: 50,
  // expire any subscription after 30 minutes
  expireIn: 30
});

// note: FastRender not defined here?

PostsDailyController = RouteController.extend({
  template: function() {
    return getTemplate('postsDaily');
  },
  waitOn: function() {
    this.days = this.params.days ? this.params.days : daysPerPage;
    // this.days = Session.get('postsDays') ? Session.get('postsDays') : 3;

    var terms = {
      view: 'daily',
      days: this.days,
      after: moment().subtract(this.days, 'days').startOf('day').toDate()
    };

    this.postsSubscription = coreSubscriptions.subscribe('postsList', terms);

    this.postsUsersSubscription = coreSubscriptions.subscribe('postsListUsers', terms);

    return [this.postsSubscription, this.postsUsersSubscription];
  },
  data: function() {
    Session.set('postsDays', this.days);
    return {
      days: this.days
    };
  }
});

Meteor.startup(function () {
  
  Router.map(function() {

    this.route('postsDaily', {
      path: '/daily/:days?',
      controller: PostsDailyController
    });

  });

});