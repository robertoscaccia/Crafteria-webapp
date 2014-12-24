adminNav.push({
	route: 'edit_news',
	label: 'Edit News'
});

adminNav.push({
	route: 'edit_events',
	label: 'Edit Events'
});

Meteor.startup(function() {
	Router.onBeforeAction(Router._filters.isAdmin, {only: ['edit_news', 'edit_events']});
	//Router.onBeforeAction(Router._filters.isAdmin, {only: ['edit_events']});

	NewsPageController = RouteController.extend({
		waitOn: function() {
			return [
				Meteor.subscribe('news')
			]
		}
	});

	EventsPageController = RouteController.extend({
		waitOn: function() {
			return [
				Meteor.subscribe('events'), Meteor.subscribe('event_categories')
			]
		}
	});

	Router.map(function() {
		this.route('edit_news', {
			controller: NewsPageController
		});

		this.route('newsPage', {
			controller: NewsPageController,
			path: '/news'
		});

		this.route('edit_events', {
			controller: EventsPageController
		});

		this.route('eventsPage', {
			controller: EventsPageController,
			path: '/events'
		});

		this.route('faqPage', {
			path: '/faq'
		});

		this.route('leader', {
    	path: '/leader'
    });

    this.route('share', {
    	path: '/share'
    });
	});
});