Template.faqPage.events({
	'click .leader-button': function() {
		Router.go('/leader');
	},
	'click .share-button': function() {
		Router.go('/share');
	}
});