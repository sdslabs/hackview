var Doc=(function(){
  //attach to events here

  //flickr helper function to call flickr API via YQL
  //returns results to the callback function
  var converter = new Showdown.converter();

  function handlePreview(){
    if($('#editor').is(':visible')){
      //we need to show the preview
      $('#preview').html(converter.makeHtml($('#editor').val()));
      $('#editor').hide();
      $('#icon-dock').hide();
      $('#preview').fadeIn();
      this.innerText = "Edit"
    }
    else{
      $('#icon-dock').fadeIn();
      $('#preview').fadeOut();
      $('#editor').show();
      this.innerText = "Preview"
    }
  }

  function _toolbar (option) {
    var data = $('#editor').getSelection();

    if (data.length!==0) {
      switch (option) {
        case 'bold-icon':   text = data.text;
                            $('#editor').surroundSelectedText('**','**');
                            break;
        case 'italic-icon': text = data.text;
                            $('#editor').surroundSelectedText('*','*');
                            break;
        case 'link-icon':   text = data.text;                                    
                            links = text.match(/^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([\/\w .-])\/?$/);
                            if (links===null || links[1]===undefined) {
                              text = '[' + text + '](http://';
                              $('#editor').replaceSelectedText(text);
                            }
                            else {
                             $('#editor').surroundSelectedText('<','> ');
                            }
                            break;
        case 'pic-icon':    text = data.text; 
                            $('#loader').css('visibility', 'visible');
                            Doc.flickr (text, function(data) {
                              obj = data.query.results.photo[0];             
                              url = 'http://farm'+obj.farm+'.static.flickr.com/'+obj.server+'/'+obj.id+'_'+obj.secret+'.jpg';
                              text = '!['+text+'](' + url + ') ';
                              $('#editor').replaceSelectedText(text);
                              $('#loader').css('visibility', 'hidden');
                            });
                            break;                    
        case 'boss-icon':   text = data.text;                 
                            $('#loader').css('visibility', 'visible');                   
                            Doc.boss(text, function(data) {
                              obj = data.query.results.bossresponse.web.results.result[0];
                              url = obj.url;
                              text = '['+text+'](' + url + ') ';
                              $('#editor').replaceSelectedText(text);
                              $('#loader').css('visibility', 'hidden');
                            });
                            break;
      }
    }
  }

  var _flickr = function(query,callback){
    var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20flickr.photos.search%20where%20text%3D%22' + escape(query) + '%22%20and%20api_key%3D%2241386f9cfb34101b940afa34f6bfba2f%22%20limit%2010&format=json&diagnostics=true&callback=?';
    console.log(url);
    $.getJSON(url,callback);
  };

  var _boss = function(query,callback){
    //@Todo, set up additional filters, use the power of BOSS
    var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20boss.search%20where%20q%3D%22' + escape(query) +'%22%20and%20ck%3D%22dj0yJmk9YWF3ODdGNWZPYjg2JmQ9WVdrOWVsWlZNRk5KTldFbWNHbzlNVEEyTURFNU1qWXkmcz1jb25zdW1lcnNlY3JldCZ4PTUz%22%20and%20secret%3D%22a3d93853ba3bad8a99a175e8ffa90a702cd08cfa%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

    $.getJSON(url,callback);
  }
  function _init(){
    var elem = document.getElementById('editor');
    sharejs.open(App.getRoom(), 'text', function(error, doc) {
        elem.disabled = false;
        doc.attach_textarea(elem);
    });
    $('#preview-button').click(handlePreview);
  };
  return {
    render: null,
    flickr: _flickr,
    boss: _boss,
    toolbar: _toolbar,
    init:_init
  };
})();
