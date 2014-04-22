var querystring = require("querystring")
  , https = require("https")
  , request = require("request");
  
module.exports = function(username, password, options) {
  if (!options) { options = { } };

  var _username = username;
  var _password = password;
  var _isAuthenticated = false;
  var _accessToken;
  
  var _authenticate = function(callback) {
    var reqOptions = {
      uri: "https://api-ssl.bit.ly/oauth/access_token",
      method: "POST",
      json: true,
      auth: { user: _username, pass: _password },
      headers: {
        "Content-Length": 0 // bitly throws 411 errors if you don't specify this header. You had to look it up
      }
    };
    
    _makeRequest(reqOptions, false, function(err, data){
      if (err) {
        _isAuthenticated = false;
        _accessToken = "";
        callback(err);
      }
      else {
        _isAuthenticated = true;
        _accessToken = data
        callback(null);
      }
    });
  };
  
  var _makeOptions = function(paths, params, callback) {
    if (_isAuthenticated) {
      params.access_token = _accessToken;
      var reqOptions = {
        uri: "https://api-ssl.bit.ly/v3/" + paths.join("/") + "?" + querystring.stringify(params),
        json: true
      };
      
      _makeRequest(reqOptions, true, callback);
    }
    else {
      _authenticate(function(err){
        if (!err) {
          _makeOptions(paths, params, callback);
        }
      });
    }
  };
  
  var _makeRequest = function(reqOptions, toJSON, callback) {
    var chunks = [];
    request(reqOptions, function(err, response, body) {
      if (err || response.statusCode !== 200) {
        callback(err || { statusCode: response.statusCode })
      }
      callback(null, body)
    });
  }
  
  this.__defineGetter__("isAuthenticated", function(){
    return _isAuthenticated;
  });
  this.__defineGetter__("accessToken", function(){
    return _accessToken || "";
  });
  
  this.authenticate = function(callback) {
    _authenticate(callback);
  };
  
  
  this.bitly_pro_domain = function(params, callback) {
    _makeOptions(["bitly_pro_domain"], params, callback);
  };

  // Officially deprecated method
  this.clicks = function(params, callback) {
    _makeOptions(["clicks"], params, callback);
  };
  
  // Officially deprecated method
  this.clicks_by_day = function(params, callback) {
    _makeOptions(["clicks_by_day"], params, callback);
  };  
  
  // Officially deprecated method
  this.clicks_by_minute = function(params, callback) {
    _makeOptions(["clicks_by_minute"], params, callback);
  };
  
  // Officially deprecated method
  this.countries = function(params, callback) {
    _makeOptions(["countries"], params, callback);
  };
  
  this.expand = function(params, callback) {
    _makeOptions(["expand"], params, callback);
  };
  
  this.info = function(params, callback) {
    _makeOptions(["info"], params, callback);
  };
    
  this.highvalue = function(params, callback) {
    _makeOptions(["highvalue"], params, callback);
  };
  
  // Officially deprecated method
  this.lookup = function(params, callback) {
    _makeOptions(["lookup"], params, callback);
  };

  // Officially deprecated method
  this.referrers = function(params, callback) {
    _makeOptions(["referrers"], params, callback);
  };

  this.search = function(params, callback) {
    _makeOptions(["search"], params, callback);
  };
  
  this.shorten = function(params, callback) {
    _makeOptions(["shorten"], params, callback);
  };

  // Officially deprecated method
  this.validate = function(params, callback) {
    _makeOptions(["validate"], params, callback);
  };
  
  this.bundle = {
    
    archive: function(params, callback) {
      _makeOptions(["bundle", "archive"], params, callback);
    },
    
    bundles_by_user: function(params, callback) {
      _makeOptions(["bundle", "bundles_by_user"], params, callback);
    },
    
    clone: function(params, callback) {
      _makeOptions(["bundle", "clone"], params, callback);
    },
    
    collaborator_add: function(params, callback) {
      _makeOptions(["bundle", "collaborator_add"], params, callback);
    },
    
    collaborator_remove: function(params, callback) {
      _makeOptions(["bundle", "collaborator_remove"], params, callback);
    },
    
    contents: function(params, callback) {
      _makeOptions(["bundle", "contents"], params, callback);
    },
    
    create: function(params, callback) {
      _makeOptions(["bundle", "create"], params, callback);
    },
    
    edit: function(params, callback) {
      _makeOptions(["bundle", "edit"], params, callback);
    },
    
    link_add: function(params, callback) {
      _makeOptions(["bundle", "link_add"], params, callback);
    },
    
    link_comment_add: function(params, callback) {
      _makeOptions(["bundle", "link_comment_add"], params, callback);
    },
    
    link_comment_edit: function(params, callback) {
      _makeOptions(["bundle", "link_comment_edit"], params, callback);
    },
    
    link_comment_remove: function(params, callback) {
      _makeOptions(["bundle", "link_comment_remove"], params, callback);
    },
    
    link_edit: function(params, callback) {
      _makeOptions(["bundle", "link_edit"], params, callback);
    },
    
    link_remove: function(params, callback) {
      _makeOptions(["bundle", "link_remove"], params, callback);
    },
    
    link_reorder: function(params, callback) {
      _makeOptions(["bundle", "link_reorder"], params, callback);
    },
    
    pending_collaborator_remove: function(params, callback) {
      _makeOptions(["bundle", "pending_collaborator_remove"], params, callback);
    },
    
    reorder: function(params, callback) {
      _makeOptions(["bundle", "reorder"], params, callback);
    },
    
    view_count: function(params, callback) {
      _makeOptions(["bundle", "view_count"], params, callback);
    }
  };
  
  this.link = {

    category: function(params, callback) {
      _makeOptions(["link", "category"], params, callback);
    },
    
    clicks: function(params, callback) {
      _makeOptions(["link", "clicks"], params, callback);
    },
    
    content: function(params, callback) {
      _makeOptions(["link", "content"], params, callback);
    },
    
    countries: function(params, callback) {
      _makeOptions(["link", "countries"], params, callback);
    },
    
    encoders: function(params, callback) {
      _makeOptions(["link", "encoders"], params, callback);
    },
    
    encoders_count: function(params, callback) {
      _makeOptions(["link", "encoders_count"], params, callback);
    },
        
    info: function(params, callback) {
      _makeOptions(["link", "info"], params, callback);
    },
    
    language: function(params, callback) {
      _makeOptions(["link", "language"], params, callback);
    },
    
    location: function(params, callback) {
      _makeOptions(["link", "location"], params, callback);
    },
    
    lookup: function(params, callback) {
      _makeOptions(["link", "lookup"], params, callback);
    },
    
    referrers: function(params, callback) {
      _makeOptions(["link", "referrers"], params, callback);
    },
    
    referrers_by_domain: function(params, callback) {
      _makeOptions(["link", "referrers_by_domain"], params, callback);
    },
    
    referring_domains: function(params, callback) {
      _makeOptions(["link", "referring_domains"], params, callback);
    },

    shares: function(params, callback) {
      _makeOptions(["link", "shares"], params, callback);
    },
    
    social: function(params, callback) {
      _makeOptions(["link", "social"], params, callback);
    }
    
  };
  
  this.realtime = {
    
    bursting_phrases: function(params, callback) {
      _makeOptions(["realtime", "bursting_phrases"], params, callback);
    },

    clickrate: function(params, callback) {
      _makeOptions(["realtime", "clickrate"], params, callback);
    },

    hot_phrases: function(params, callback) {
      _makeOptions(["realtime", "hot_phrases"], params, callback);
    },

  };
  
  this.user = {

    bundle_history: function(params, callback) {
      _makeOptions(["user", "bundle_history"], params, callback);
    },
    
    clicks: function(params, callback) {
      _makeOptions(["user", "clicks"], params, callback);
    },

    countries: function(params, callback) {
      _makeOptions(["user", "countries"], params, callback);
    },
        
    info: function(params, callback) {
      _makeOptions(["user", "info"], params, callback);
    },
    
    link_edit: function(params, callback) {
      _makeOptions(["user", "link_edit"], params, callback);
    },
    
    link_history: function(params, callback) {
      _makeOptions(["user", "link_history"], params, callback);
    },
    
    link_lookup: function(params, callback) {
      _makeOptions(["user", "link_lookup"], params, callback);
    },
    
    link_save: function(params, callback) {
      _makeOptions(["user", "link_save"], params, callback);
    },
    
    network_history: function(params, callback) {
      _makeOptions(["user", "network_history"], params, callback);
    },
    
    popular_links: function(params, callback) {
      _makeOptions(["user", "popular_links"], params, callback);
    },
    
    referrers: function(params, callback) {
      _makeOptions(["user", "referrers"], params, callback);
    },
    
    referring_domains: function(params, callback) {
      _makeOptions(["user", "referring_domains"], params, callback);
    },
    
    share_counts: function(params, callback) {
      _makeOptions(["user", "share_counts"], params, callback);
    },
    
    share_counts_by_share_type: function(params, callback) {
      _makeOptions(["user", "share_counts_by_share_type"], params, callback);
    },

    shorten_counts: function(params, callback) {
      _makeOptions(["user", "shorten_counts"], params, callback);
    },
        
    tracking_domain_list: function(params, callback) {
      _makeOptions(["user", "tracking_domain_list"], params, callback);
    },
    
    tracking_domain_clicks: function(params, callback) {
      _makeOptions(["user", "tracking_domain_clicks"], params, callback);
    },
    
    tracking_domain_shorten_counts: function(params, callback) {
      _makeOptions(["user", "tracking_domain_shorten_counts"], params, callback);
    }
    
  };

}