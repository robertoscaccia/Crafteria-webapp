Template.edit_news.helpers({
  news: function(){
    return News.find({}, {sort: {order: 1, name: 1}});
  }
});

Template.edit_news.events({
  'click input[type=submit]': function(e){
    e.preventDefault();

    var name = $('#name').val();
    var numberOfNewsItems = News.find().count();
    var order = parseInt($('#order').val()) || (numberOfNewsItems + 1);
    var description = $('#description').val();
    var link = $('#link').val();

    if (link.substring(0, 5) !== "http:" && link.substring(0, 6) !== "https:")
      link = ("http://" + link)

    if (!validateURL(link))
      console.log('invalid URL', link);

    if (!name || !link || !description) {
      throwError('');
    } else {
      console.log('inserting news');
      console.log(News.find().fetch());
      News.insert({
        order: order,
        link: link,
        name: name,
        description: description
      });
    }
  }
});


Template.news_item.events({
  'click .edit-link': function(e, instance) {
    e.preventDefault();
    var newsId = instance.data._id;
    var name = $('#name_'+newsId).val();
    var description = $('#description_'+newsId).val();
    var order = parseInt($('#order_'+newsId).val());
    var link = $('#link_'+newsId).val();

    if (link.substring(0, 5) !== "http:" && link.substring(0, 6) !== "https:")
      link = ("http://" + link)

    if(name){
      News.update(newsId,{ $set: {name: name, description: description, link: link, order: order}});
    }else{
      News.remove(newsId);
    }
  },
  'click .delete-link': function(e, instance) {
    e.preventDefault();
    var newsId = instance.data._id;
    News.remove(newsId);
  }
});

