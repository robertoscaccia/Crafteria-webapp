var eventsTabs = [
	{title: 'Upcoming', eventType: 'upcoming'},
	{title: 'Past', eventType: 'past'}
];

Template.eventsPage.rendered = function() {
	Session.set('eventType', 'upcoming');
	Session.set('eventCategory', 'all');
}

Template.eventsPage.helpers({
	_events: function() {
		var eventType = Session.get('eventType'); 
		var sortModifier = (eventType === 'upcoming') ? 1 : -1;
		var events = Events.find({}, { sort: { date: sortModifier, name: 1 } });
		var e = [];
		events.forEach(function(event) {
			if (!eventInCategory(event))
				return;

			var date = moment(event.date);

			var startOfDay = moment().startOf('day');

			if (eventType === 'upcoming') {
				if (!date.isBefore() || date.isSame(startOfDay, 'day'))
					e.push(event)
			}
			else if (eventType === 'past') {
				if (date.isBefore() && !date.isSame(startOfDay, 'day'))
					e.push(event)
			}
		});
		return e;
	},
	shortDate: function(date) {
		return moment(date).format("MMM");
	},
	day: function(date) {
		return moment(date).format("D");
	},
	tabs: function() {
		return eventsTabs;
	},
	isActive: function(eType) {
		var mode = Session.get('eventType');
		return mode === eType;
	},
	categories: function() {
		var category = Session.get('eventCategory');
		var categories = EventCategories.find({}, {sort: { order: 1, name: 1 }}).fetch();
		if (category === 'all') {
			return categories;
		} else {
			for (var i = 0; i < categories.length; i++) {
				if (categories[i]._id === category) {
					categories.splice(i, 1);
				}
			}
			categories.unshift({_id: "all", name: i18n.t('All Categories') });
			return categories;
		}
	},
	head_category: function() {
		var category = Session.get('eventCategory');
		if (category === 'all') {
			return i18n.t('All Categories');
		} else {
			return EventCategories.findOne(category).name;
		}
			
	}
});

var eventInCategory = function(event) {
	var category = Session.get('eventCategory');
	if (category == 'all') { 
		return true; 
	} else {
		for (var i = 0; i < event.categories.length; i++) {
			if (event.categories[i]._id === category)
				return true;
		}
		return false;
	}
}

Template.eventsPage.events({
	'click .event-tab': function() {
		Session.set('eventType', this.eventType);
	},
	'click .event-category-li': function() {
		Session.set('eventCategory', this._id);
	}
});