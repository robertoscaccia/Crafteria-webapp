Meteor.startup(function () {

  Template[getTemplate('moreMenu')].helpers({
    hasMoreMenuNav: function () {
      return !!moreMenuNav;
    },
    moreMenuNav: function () {
      return moreMenuNav;
    }
  });

});