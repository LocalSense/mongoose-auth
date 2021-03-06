// Defaults
module.exports = {
  findOrCreateUser: function (sess, accessTok, accessTokExtra, foursquareUser) {
    var promise = this.Promise()
      , self = this;
    this.User()().findOne({'foursquare.id': foursquareUser.id}, function (err, foundUser) {
      if (err) return promise.fail(err);
      if (foundUser) {
        return promise.fulfill(foundUser);
      }
      self.User()().createWithFoursquare(foursquareUser, accessTok, accessTokExtra, function (err, createdUser) {
        if (err) return promise.fail(err);
        return promise.fulfill(createdUser);
      });
    });
    return promise;
  }
};
