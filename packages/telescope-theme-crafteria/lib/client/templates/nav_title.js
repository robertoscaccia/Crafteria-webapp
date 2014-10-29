Meteor.startup(function() {
	Template.navTitle.helpers({
		title: function() {
			return getSetting('title');
		},
		tagline: function() {
			return getSetting('tagline');
		}
	});
});