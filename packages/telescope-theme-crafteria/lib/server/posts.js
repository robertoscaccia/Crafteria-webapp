Meteor.methods({
	postsCount: function() {
		return Posts.find().count();
	},
	lastPost: function() {
		return Posts.findOne({}, {sort: { postedAt: 1 }, limit: 1 });
	}
});