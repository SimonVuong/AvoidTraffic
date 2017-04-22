var Api = new Restivus({
  prettyJson: true
});

Api.addRoute('setAlert/:fromPlaceId/:toPlaceId/:fromText/:toText/:minSeconds/:phone', {
  get () {
    try {
      Meteor.call('setAlert', this.urlParams.fromPlaceId, this.urlParams.toPlaceId, this.urlParams.fromText,
      this.urlParams.toText, parseInt(this.urlParams.minSeconds), this.urlParams.phone);
      return 'alert set successfully';
    } catch (e) {
      if (e.errorType === 'Meteor.Error') {
        return e;
      } else {
        return 'Internal server error';
      }
    }
  }
});