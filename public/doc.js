var Doc=(function(){
  //attach to events here

  //flickr helper function to call flickr API via YQL
  //returns results to the callback function
  var _flickr = function(query,callback){
    var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20flickr.photos.search%20where%20text%3D%22' + escape(query) + '%22%20and%20api_key%3D%2241386f9cfb34101b940afa34f6bfba2f%22%20limit%2010&diagnostics=true&callback=?';
    $.getJSON(url,callback);
  };

  var _boss = function(query,callback){
    //@Todo, set up additional filters, use the power of BOSS
    var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20boss.search%20where%20q%3D%22' + query +'%22%20and%20ck%3D%22dj0yJmk9YWF3ODdGNWZPYjg2JmQ9WVdrOWVsWlZNRk5KTldFbWNHbzlNVEEyTURFNU1qWXkmcz1jb25zdW1lcnNlY3JldCZ4PTUz%22%20and%20secret%3D%22a3d93853ba3bad8a99a175e8ffa90a702cd08cfa%22&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
    $.getJSON(url,callback);
  }
  function _init(){
    var elem = document.getElementById('editor');
    sharejs.open('hello', 'text', function(error, doc) {
        elem.disabled = false;
        doc.attach_textarea(elem);
    });
  }
  return {
    render: null,
    flickr: _flickr,
    boss: _boss ,
    init:_init
  };
})();
