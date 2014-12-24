Template.newsPage.helpers({
	news: function() {
		return News.find({}, {sort: {order: 1, name: 1}});
	}
});