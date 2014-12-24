Meteor.publish('news', function() {
  return News.find();
});

Meteor.publish('events', function() {
  return Events.find();
});

Meteor.publish('event_categories', function() {
	return EventCategories.find();
});