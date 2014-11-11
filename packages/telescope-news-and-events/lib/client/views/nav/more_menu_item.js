Meteor.startup(function () {

  Template[getTemplate('moreMenuItem')].helpers({
    route: function () {
      return Router.route(this.route).path();
    },
    label: function () {
      return i18n.t(this.label);
    }
  });

});
