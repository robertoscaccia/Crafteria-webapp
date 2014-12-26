Template.faqPage.events({
	'click .leader-button': function() {
		Router.go('/sign-up');
	},
	'click .share-button': function() {
		Router.go('/share');
	}
});
