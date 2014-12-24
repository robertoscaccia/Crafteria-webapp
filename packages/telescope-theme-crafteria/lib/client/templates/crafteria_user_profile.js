var postTypes = [
	{postType: 'upvotes', typeString: 'Upvoted' },
	{postType: 'submits', typeString: 'Submitted' },
	{postType: 'comments', typeString: 'Comments' }
]

Template.crafteria_user_profile.rendered = function() {
	Session.set('profileMode', 'upvotes');
}

Template.crafteria_user_profile.helpers({
	user_avatar: function() {
		return Avatar.getUrl(this.user);
	},
	memberSince: function() {
		return moment(this.createdAt).format("D MMMM YYYY");
	},
	tabs: function() {
		return postTypes;
	},
	isActive: function(tab) {
		var mode = Session.get('profileMode');
		return mode === tab;
	},
	typeCount: function(user) {
		var type = this.postType;
		if (type === 'upvotes') {
			var count = 0;
			var upvotes = user.votes.upvotedPosts;
			for (var i = 0; i < upvotes.length; i++) {
				if (Posts.findOne(upvotes[i].itemId))
					count++;
			}
			return count;
		}

		if (type === 'submits')
			return user.postCount || 0;

		if (type === 'comments') {
			var count = 0;
			var comments = Comments.find({userId: user._id}).fetch();
			for (var i = 0; i < comments.length; i++) {
				if (Posts.findOne(comments[i].postId))
					count++;
			}
			return count;
		}
	},
	typePosts: function() {
		var mode = Session.get('profileMode');
		var posts;
		if (mode === 'upvotes') {
			if(!!this.votes.upvotedPosts) {
				var upvoted = this.votes.upvotedPosts;
				var upvotes = _.sortBy(upvoted, function(vote) {
					return vote.votedAt;
				});
				upvotes = upvotes.reverse();
				var extendedVotes = upvotes.map(function (item, index) {
	        var post = Posts.findOne(item.itemId);
	        if (post)
	        	return _.extend(item, post);
	      });
	      var tmpArray = [];
	      for (var i = 0; i < extendedVotes.length; i++) {
	      	if (typeof extendedVotes[i] !== "undefined")
	      		tmpArray.push(extendedVotes[i]);
	      }
	      extendedVotes = tmpArray;
				posts = _.first(extendedVotes, Session.get('upvotedPostsShown'));
			}
		}
		if (mode === 'submits') {
			posts = Posts.find({userId: this._id}, {
				limit: Session.get('postsShown'), 
				sort: {createdAt: -1} 
			});			
		}
		if (mode === 'comments') {
			var comments = Comments.find({userId: this._id}, {
				limit: Session.get('commentsShown'),
				sort: {postedAt: -1}
			});
	    if(!!comments){
	      // extend comments with each commented post
	      var extendedComments = comments.map(function (comment) {
	        var post = Posts.findOne(comment.postId);
	        if(post) // post might not be available anymore
	          comment.postTitle = post.title;
	        return comment;
	      });
	      var tmpArray = [];
	      for (var i = 0; i < extendedComments.length; i++) {
	      	if (typeof extendedComments[i].postTitle !== "undefined")
	      		tmpArray.push(extendedComments[i]);
	      }
	      extendedComments = tmpArray;
	      posts = extendedComments;
	    }
		}
		return posts;
	},
	typeComments: function() {
		return Session.get('profileMode') === 'comments';
	},
	timeAgo: function(date) {
		return moment(date).fromNow();

	}
});

Template.crafteria_user_profile.events({
	'click .profile-tab': function() {
		Session.set('profileMode', this.postType);
	}
});