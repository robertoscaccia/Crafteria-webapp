eventsSchema = new SimpleSchema({
 _id: {
    type: String,
    optional: true
  },
  date: {
    type: Number,
    optional: true
  },
  link: {
    type: String
  },
  description: {
    type: String
  },
  name: {
    type: String
  },
  categories: {
    type: [String],
    optional: true
  }    
});

Events = new Meteor.Collection("events", {
  schema: eventsSchema
});

eventCategoriesSchema = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  name: {
    type: String
  },
  order: {
    type: Number,
    optional: true
  }
});

EventCategories = new Meteor.Collection("event_categories", {
  schema: eventCategoriesSchema
});

Meteor.startup(function () {
  Events.allow({
    insert: isAdminById
  , update: isAdminById
  , remove: isAdminById
  });

  EventCategories.allow({
    insert: isAdminById
  , update: isAdminById
  , remove: isAdminById
  })
});