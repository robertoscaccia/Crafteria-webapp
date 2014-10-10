Meteor.startup(function () {
  Template[getTemplate('postShare')].helpers({
    userAvatar: function(){
      // THIS FUNCTION IS DEPRECATED -- package bengott:avatar is used instead.
      var author = Meteor.users.findOne(this.userId, {reactive: false});
      if(!!author)
        return getAvatarUrl(author); // ALSO DEPRECATED
    },
    sourceLink: function(){
      return !!this.url ? this.url : getSiteUrl() + "posts/"+this._id;
    },
    viaTwitter: function () {
      return !!getSetting('twitterAccount') ? 'via='+getSetting('twitterAccount') : '';
    }
  });

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
