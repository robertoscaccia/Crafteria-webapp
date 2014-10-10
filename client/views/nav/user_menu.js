Template[getTemplate('userMenu')].helpers({
  isLoggedIn: function () {
    return !!Meteor.user();
  },
  avatarUrl: function() {
    return getAvatarUrl(Meteor.user());
  },
  name: function () {
    return getDisplayName(Meteor.user());
  },
  profileUrl: function () {
    return getProfileUrl(Meteor.user());
  }
});
