require('dotenv').config();
const axios = require('axios');
const apiHost = process.env.API_HOST;

module.exports = {
  getNew: function(req, res, next) {
    var userId = req.signedCookies.user_id;
    res.render('./note/new', {
      userId: userId
    });
  },
  getNotes: function(req, res, next) {
    var url = apiHost + '/note/list/';
    var userId = req.signedCookies.user_id;
    axios.get(url + userId)
      .then(function(response) {
        var result = response.data;
        var data = {
          high: result.filter((note) => {
            return note.criticalLevel === 'high'
          }),
          medium: result.filter((note) => {
            return note.criticalLevel === 'medium'
          }),
          low: result.filter((note) => {
            return note.criticalLevel === 'low'
          })
        };
        res.render('./note/index', {
          data: data,
          apiHost: apiHost
        });
      })
      .catch(function(err) {
        res.render('./note/index', {
          errs: [err.message]
        });
      });
  },
  postNew: function(req, res, next) {
    var url = apiHost + '/note/add';
    var userId = req.signedCookies.user_id;
    var note = req.body;
    note.userId = userId;
    axios.post(url, note)
      .then(function(response) {
        res.redirect('/note');
      })
      .catch(function(error) {
        res.render('./note/new', {
          errs: [error.message]
        });
      });
  },
  getEdit: function(req, res, next) {
    var noteId = req.params.id;
    var url = apiHost + '/note/detail/' + noteId;
    axios.get(url)
      .then(function(response) {
        var note = response.data;
        res.render('./note/edit', {
          note: note
        });
      })
      .catch(function(error) {
        res.render('./note/index', {
          errs: [error.message]
        });
      });
  },
  postEdit: function(req, res, next) {
    var noteId = req.params.id;
    var url = apiHost + '/note/update/' + noteId;
    axios.put(url, req.body)
      .then(function(response) {
        var note = response.data;
        res.redirect('/note');
      })
      .catch(function(err) {
        res.render('./note/edit', {
          errs: [error.message]
        });
      });
  },
  deleteNote: function(req, res, next) {
    var noteId = req.params.id;
    var url = apiHost + '/note/delete/' + noteId;
    axios.delete(url)
      .then(function(response) {
        res.redirect('/note');
      })
      .catch(function(error) {
        res.render('./note/index', {
          errs: [error.message]
        });
      });
  }
}
