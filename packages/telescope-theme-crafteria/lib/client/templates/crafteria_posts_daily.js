postsDaily = {}

Template.crafteriaPostsDaily.helpers({
	morePosts: function() {
		if (postsDaily.lastPostDep) {
			postsDaily.lastPostDep.depend();
			var daysToCheck = Session.get('postsDays') - 1;
			return moment().startOf('day').subtract(daysToCheck, 'days').isAfter(postsDaily.lastPost.postedAt);
		}
	},
	showDailyPost: function() {
		if (this.index === 0)
			return true;

		if (postsDaily.lastPostDep) {
			postsDaily.lastPostDep.depend();
			return moment(this.date).add(1, 'days').isAfter(postsDaily.lastPost.postedAt);
		}
	}
});

Template.crafteriaPostsDaily.created = function() {
	postsDaily.lastPostDep = new Tracker.Dependency();
	postsDaily.lastPost = '';
	Meteor.call('lastPost', function(err, res) {
		postsDaily.lastPost = res;
		postsDaily.lastPostDep.changed();
	});
}