newsSchema = new SimpleSchema({
 _id: {
    type: String,
    optional: true
  },
  order: {
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
});

News = new Meteor.Collection("news", {
  schema: newsSchema
});

Meteor.startup(function () {
  News.allow({
    insert: isAdminById
  , update: isAdminById
  , remove: isAdminById
  });
});