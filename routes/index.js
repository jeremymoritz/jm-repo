//  Routing
var _assign = require('lodash-node').assign;
var jm = require('jeremy-moritz');
var self = this;

module.exports = {
  index: function index(req, res) {
    jm.id = arguments.callee.name;

    res.render(jm.id, jm);
  },

  about: function about(req, res) {
    _assign(jm, {
      id: arguments.callee.name,
      myBirthday: '1981-06-30',
      angelsBirthday: '2004-09-18',
      chasesBirthday: '2012-07-20',
      weddingDay: '2001-12-22',
    });

    res.render(jm.id, jm);
  },

  examples: function examples(req, res) {
    var page = arguments.callee.name;
    _assign(jm, {id: page});

    res.render(jm.id, jm);
  },

  contact: function contact(req, res) {
    var page = arguments.callee.name;
    _assign(jm, {
      id: arguments.callee.name,
      userAgent: req.headers['user-agent']
    });

    res.render(jm.id, jm);
  },

  handlePost: function handlePost(req, res) {
    if (req.params.pageCalled === 'contact') {
      var mailSender = require('./mail-sender');

      mailSender.sendContactFormMailer(req, res);
    }
  }
};
