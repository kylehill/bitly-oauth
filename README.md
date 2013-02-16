bitly-oauth
===========

A node.js wrapper for bit.ly API with the OAuth-required methods.

Install it:
  
    npm install bitly-oauth

Use it:

    '''javascript
    var Bitly = require("bitly-oauth");
    var b = new Bitly("username", "password");
    
    // Optional step if you want to authenticate manually..
    b.authenticate(function(err){
      console.log(b.isAuthenticated);
    });
    
    // First parameter is an object containing all query parameters
    // Second parameter is a function(err, result) callback
    // Calls /v3/link/click
    b.link.click({ link: "http://bit.ly/Vnr22W" }, function(err, result){
      // do stuff
    });
    
    // Calls /v3/expand
    b.expand({ shortUrl: "http://bit.ly/Vnr22W" }, function(err, result){
      // do moar stuff
    });
    '''
    
The query parameters are listed in the individual method signatures in the [bitly documentation](http://dev.bitly.com/api.html). 