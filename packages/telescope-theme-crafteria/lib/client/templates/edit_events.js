Template.edit_events.rendered = function() {
	$('#date').datepicker();
}

Template.edit_events.helpers({
	_events: function() {
		return Events.find({}, {sort: { date: 1, name: 1 }});
	},
	event_categories: function() {
		return EventCategories.find({}, {sort: { order: 1, name: 1 }});
	}
});

Template.edit_events.events({
	'click #event-submit': function(e) {
		e.preventDefault();

		var name = $('#name').val();
		var description = $('#description').val();
		var link = $('#link').val();
		var dateString = $('#date').val();
    var date = moment(dateString, "MM/DD/YYYY").format("YYYY-MM-DD HH:mm:ss");
    var categories = [];
    $("input[name=category]:checked").each(function() { 
    	categories.push( EventCategories.findOne( $(this).val() ) );
    });

		if (link.substring(0, 5) !== "http:" && link.substring(0, 6) !== "https:")
      link = ("http://" + link)

    if (!validateURL(link))
      console.log('invalid URL', link);


    if (!name || !link || !date || !description) {

    } else {
    	Events.insert({
    		name: name,
    		description: description,
    		link: link,
    		date: date,
    		categories: categories
    	});
    }
	},
	'click #category-submit': function(e) {
		e.preventDefault();

		var name = $('#category-name').val();
		var numberOfCategories = EventCategories.find().count();
    var order = parseInt($('#category-order').val()) || (numberOfCategories + 1);

    if (name && order) {
    	EventCategories.insert({
    		name: name,
    		order: order
    	});
    }
  }
});

Template.event_item.rendered = function() {
	$("[id^=date_]").datepicker();
}

Template.event_item.helpers({
	event_categories: function() {
		return EventCategories.find({}, {sort: { order: 1, name: 1 }});
	},
	checked: function(event) {
		for (i = 0; i < event.categories.length; i++) {
			if (_.isEqual(this, event.categories[i]))
				return "checked";
		}
		return "test";
	}
});

Template.event_item.events({
  'click .edit-link': function(e, instance) {
    e.preventDefault();
    var eventId = instance.data._id;
    var name = $('#name_'+eventId).val();
    var description = $('#description_'+eventId).val();
    var link = $('#link_'+eventId).val();
    var dateString = $('#date_'+eventId).val();
    var date = moment(dateString, "MM/DD/YYYY").format("YYYY-MM-DD HH:mm:ss");

    var categories = [];
    $("input[name=event_" + eventId + "_category]:checked").each(function() { 
    	categories.push( EventCategories.findOne( $(this).val() ) );
    });

    if (link.substring(0, 5) !== "http:" && link.substring(0, 6) !== "https:")
      link = ("http://" + link)

    if(name){
      Events.update(eventId,{ $set: {
      	name: name, 
      	description: description, 
      	link: link, 
      	date: date, 
      	categories: categories
      }});
    } else {
      Events.remove(eventId);
    }
  },
  'click .delete-link': function(e, instance) {
    e.preventDefault();
    var eventId = instance.data._id;
    Events.remove(eventId);
  }
});

Template.category_item.events({
	'click .edit-link': function(e, instance) {
		e.preventDefault();
		var categoryId = instance.data._id;
		var name = $('#category_name_'+categoryId).val();
		var order = parseInt($('#category_order_'+categoryId).val());

		if (name) {
			EventCategories.update(categoryId, { $set: { name: name, order: order }});
		} else {
			EventCategories.remove(categoryId);
		}
	},
	'click .delete-link': function(e, instance) {
		e.preventDefault();
		var categoryId = instance.data._id;
		EventCategories.remove(categoryId);
	}
});