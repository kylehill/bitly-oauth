var Bitly = require("../");
var assert = require("assert");

var bitlyUsername = "bitlyoauth";
var bitlyPassword = "password";

describe("Connectivity and authentication", function(){
  
  it("should not default to valid", function(){
    var b = new Bitly(bitlyUsername, bitlyPassword);
    assert.equal(b.isAuthenticated, false);
    assert.equal(b.accessToken, "");
  });
  
  it("should authenticate", function(done){
    var b = new Bitly(bitlyUsername, bitlyPassword);
    b.authenticate(function(err){
      assert.equal(b.isAuthenticated, true);
      assert.notEqual(b.accessToken, "")
      done();
    });
  });

  it("should not need to explicitly authenticate", function(done){
    var b = new Bitly(bitlyUsername, bitlyPassword);
    assert.equal(b.isAuthenticated, false);
    
    b.user.info({}, function(err, data){
      assert.equal(b.isAuthenticated, true);
      done();
    });
  });
  
});

describe("Method testing:", function(){
  var b = new Bitly(bitlyUsername, bitlyPassword);
  before(function(done){
    b.authenticate(function(){
      done();
    })
  });
  
  describe("Top-level", function(){

    it("includes highvalue", function(done){
      b.highvalue({ limit: 1 }, function(err, response){
        assert.equal(response.status_txt, "OK");
        assert.ok(response.data.values);
        done()
      });
    });

    it("includes search", function(done){
      b.search({ query: "nodejs" }, function(err, response){
        assert.equal(response.status_txt, "OK");
        assert.ok(response.data.results);
        done()
      });
    });
    
    it("includes expand", function(done){
      b.expand({ shortUrl: "http://bit.ly/Z5Z5fO" }, function(err, response){
        assert.equal(response.status_txt, "OK");
        assert.ok(response.data.hasOwnProperty("expand"));
        done()
      });
    });
    
    it("includes info", function(done){
      b.info({ shortUrl: "http://bit.ly/Z5Z5fO" }, function(err, response){
        assert.equal(response.status_txt, "OK");
        assert.ok(response.data.hasOwnProperty("info"));
        done()
      });
    });
    
    it("includes shorten", function(done){
      b.shorten({ longUrl: "http://proudlymadeindc.com" }, function(err, response){
        assert.equal(response.status_txt, "OK");
        assert.ok(response.data.hasOwnProperty("url"));
        done()
      });
    });
    
  });
  
  describe("Link", function(){
    
    it("includes info", function(done){
      b.link.info({ link: "http://bit.ly/Z5Z5fO" }, function(err, response){
        assert.equal(response.status_txt, "OK");
        assert.ok(response.data.hasOwnProperty("canonical_url"));
        done()
      });
    });
    
    it("includes content", function(done){
      b.link.content({ link: "http://bit.ly/Z5Z5fO" }, function(err, response){
        assert.ok(response.status_txt);
        if (response.status_code !== 404) {
          assert.ok(response.data.content); 
        }
        done()
      });
    });
    
    it("includes category", function(done){
      b.link.category({ link: "http://bit.ly/Z5Z5fO" }, function(err, response){
        assert.equal(response.status_txt, "OK");
        assert.ok(response.data.hasOwnProperty("categories"));
        done()
      });
    });
    
    it("includes social", function(done){
      b.link.social({ link: "http://bit.ly/Z5Z5fO" }, function(err, response){
        assert.ok(response.status_txt);
        assert.ok(response.data.hasOwnProperty("social_scores"));
        done()
      });
    });
    
    it("includes location", function(done){
      b.link.location({ link: "http://bit.ly/Z5Z5fO" }, function(err, response){
        assert.ok(response.status_txt, "Status");
        assert.ok(response.data.hasOwnProperty("locations"));
        done()
      });
    });
    
    it("includes language", function(done){
      b.link.language({ link: "http://bit.ly/Z5Z5fO" }, function(err, response){
        assert.ok(response.status_txt);
        assert.ok(response.data.hasOwnProperty("languages"));
        done()
      });
    });
    
    it("includes lookup", function(done){
      b.link.lookup({ url: "http://google.com" }, function(err, response){
        assert.ok(response.status_txt);
        assert.ok(response.data);
        done()
      });
    });
    
  });
  
  describe("User", function(){
    
    it("includes link_edit", function(done){
      b.user.link_edit({ edit: "title", title: "HERP DERP", link: "http://bit.ly/Z5Z5fO" }, function(err, response){
        assert.ok(response.status_txt);
        assert.ok(response.data.hasOwnProperty("link_edit"));
        done()
      });
    });
    
    it("includes link_lookup", function(done){
      b.user.link_lookup({ url: "http://google.com" }, function(err, response){
        assert.ok(response.status_txt);
        assert.ok(response.data.hasOwnProperty("link_lookup"));
        done()
      });
    });
    
    it("includes link_save", function(done){
      b.user.link_save({ longUrl: "http://google.com" }, function(err, response){
        assert.ok(response.status_txt);
        assert.ok(response.data.hasOwnProperty("link_save"));
        done()
      });
    });
    
  });
  
  describe("Realtime", function(){

    it("includes bursting_phrases", function(done){
      b.realtime.bursting_phrases({}, function(err, response){
        assert.equal(response.status_txt, "OK");
        assert.ok(response.data.phrases);
        done()
      });
    });
    
    it("includes hot_phrases", function(done){
      b.realtime.hot_phrases({}, function(err, response){
        assert.equal(response.status_txt, "OK");
        assert.ok(response.data.phrases);
        done()
      });
    });

    it("includes clickrate", function(done){
      b.realtime.clickrate({ phrase: "nodejs" }, function(err, response){
        assert.equal(response.status_txt, "OK");
        assert.equal(response.data.phrase, "nodejs");
        done()
      });
    });
    
  });
  
});
