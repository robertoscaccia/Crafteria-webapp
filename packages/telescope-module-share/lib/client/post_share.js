Meteor.startup(function () {
  Template[getTemplate('postShare')].helpers({
    userAvatar: function(){
      // THIS FUNCTION IS DEPRECATED -- package bengott:avatar is used instead.
      var author = Meteor.users.findOne(this.userId, {reactive: false});
      if(!!author)
        return getAvatarUrl(author); // ALSO DEPRECATED
    },
    authorName: function(){
      return getAuthorName(this);
    },
    profileUrl: function () {
      var author = Meteor.users.findOne(this.userId, {reactive: false});
      return getProfileUrl(author);
    },
    getTwitterName: function () {
      var author = Meteor.users.findOne(this.userId, {reactive: false});
      return getTwitterName(author);
    },
    getBio: function() {
      var author = Meteor.users.findOne(this.userId, {reactive: false});
      return author.profile.bio;
    },
    sourceLink: function(){
      return !!this.url ? this.url : getSiteUrl() + "posts/"+this._id;
    },
    viaTwitter: function () {
      var twitterName = getSetting('twitterAccount');
      return !!getSetting('twitterAccount') ? 'via='+twitterName.slice(1, twitterName.length) : '';
    },
    discussLink: function() {
      return discussLink(this._id);
    },
    facebookLink: function() {
      var facebook = ServiceConfiguration.configurations.findOne({service: 'facebook'});
      if (!facebook) {
        var sourceLink = !!this.url ? this.url : getSiteUrl() + "posts/"+this._id;
        return "https://www.facebook.com/sharer/sharer.php?u=" + sourceLink;
      } else {
        return "https://www.facebook.com/dialog/share?" +
          "app_id=" + facebook.appId +
          "&display=popup" +
          "&href=" + discussLink(this._id) +
          "&redirect_uri=" + discussLink(this._id);
      }
    }
  });

  var discussLink = function(postId) {
    return Meteor.absoluteUrl() + 'posts/' + postId;
  }

  Template[getTemplate('postShare')].events({
    'click .share-link': function(e){
      var $this = $(e.target).parents('.post-share').find('.share-link');
      var $share = $this.parents('.post-share').find('.share-options');
      e.preventDefault();
      $('.share-link').not($this).removeClass("active");
      $(".share-options").not($share).addClass("hidden");
      $this.toggleClass("active");
      $share.toggleClass("hidden");
    }
  });
});
