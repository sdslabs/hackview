/**
 * This is the UI module and handles UI changes
 */
var UI=(function(){

  //Function to refresh the UI depending on various things
  function _refresh(){
    console.log ('refresh called');
    var vids=$('#videos video');
    var count = vids.length;
    count=count<1 ? 1:count;
    var maxWidth = 400*count;
    var width = $('#videos').width();
    if(width>maxWidth)
      width=maxWidth;
    var width = width/count;
    var height=3/4*width;
    for(i=0;i<count;i++){
      vids[i].width=width;
      vids[i].height=height;
      $(vids[i]).css('left',i*width);
    }
    $('#videos').css('min-height',height);
    var height=window.innerHeight-height-60;
    $('#editor').attr('rows',height/parseInt($('#editor').css('line-height'),10));
    $('#preview').css('height',height+10);
  }


  //Function to add FlickR image to editor
  // $('#pic-icon').on('click', '$("#editor")', function(event) {
  //   event.preventDefault();
  //   console.log('hello');
  //   $(this).append('hello world');
  // });

	$(document).ready(function hooks(){

    if (window.location.search=='?asknick=yes') {
      console.log('running');
      $('.container-fluid').fadeOut();
      $('#overlay').fadeIn();
      $('#nick-popup').submit(function(e) {
        e.preventDefault();
        var nick = $('#nickname').val();
        if (nick!='') {
          $.get('/setnick',{nick:nick});
          Hangout.init();
          $('#overlay').fadeOut();
          $('.container-fluid').fadeIn();
        }
      });
    }
    else
        Hangout.init();
		//Start Instant chat read and write code
		$('#chat-form').submit(function(e){
     	 e.preventDefault();
      var val =  $('#chat-edit').val();
      $('#chat-edit').val('');
      if (val!='')
        Hangout.chat(val);
    });

		$('.md-icon').on('click', function() {
    		var option = $(this).attr('id');
    		Doc.toolbar(option);
  	});
    
    $('#editor').bind('keydown', 'ctrl+b', function() {
       Doc.toolbar('bold-icon');
    });
    $('#editor').bind('keydown', 'ctrl+i', function() {
       Doc.toolbar('italic-icon');
    });
    $('#editor').bind('keydown', 'ctrl+q', function() {
       Doc.toolbar('boss-icon');
    });

		$('#videos').delegate('video','click', function(){
			//var src = $(this).attr('src')
			//this refers to the current video clicked
			var clickedVideo = $(this).clone();
			
			var big = clickedVideo.css({
				'width' : 600,
				'height' : 800,
				'top' : 100,
				'marginTop' : -100,
				'left' : 100,
				'marginLeft' : 100
			}) 
			/* Todo Work on the Responsive Part */
			$('div.black-back').css({
				'width': $(window).innerWidth(),
				'height': $(window).innerHeight()
			}).show();

			//$('video.big').attr('src',src);
			$('div.right-black').append( big );
				
			$('.video-list').html('');
			$('#videos video').each(function(){
				var videoClone = $(this).clone();
				 

				$('.video-list').append($('<li>').html(videoClone.css({
							'width': 200,
							'height': 150,
							'margin': 0,
							'left':0
							})));
			})



			//$('.video-list li:eq(1)').html( big.clone().css({
			//	 ); 

		});

		$('.video-list').delegate('video','click',function(){
			
			var vid = $(this).clone().css({
				'width' : 600,
				'height' : 800,
				'top' : 100,
				'marginTop' : -100,
				'left' : 100,
				'marginLeft' : 100
			});

			$('.right-black video').remove()
			$('.right-black').append( vid );
			console.log( vid )
			
/*
		var src = $(this).attr('src');
		$('video.big').attr('src',src);
*/
		})

		$('a.conf-back').click(function(){
			$('div.black-back').hide();
		})
		/*
		var video = $('video'),
			$overlay = $('#videos .video-overlay');

			video.wrap($('<div class="video-wrap"/>'));
			$('.video-wrap').css({
				'width' : $(this).find('video').width(),
				'height' : $(this).find('video').height()
			})

		var videoOverlay = function(e){
			console.log('Mouse Enter Event');
			$this = $(this).find('video');
			console.log($this);
			$overlay.css({
				'width': $this.width(),
				'height': $this.height(),
				'position': 'absolute',
				'left': $this.position().left,
				'top': $this.position.top,
				'z-index': 100
			}).stop(true,true).fadeIn();
			
		}

		var eraseOverlay = function(e){

			$overlay.stop(true,true).fadeOut();
		}

		//video.hover(videoOverlay,eraseOverlay);
		
		$('.video-wrap').on('mouseenter', videoOverlay);
		$('.video-wrap').on('mouseleave', eraseOverlay)
		
		*/
	});
  //this will handle the UI Portions
  return {
  	//this changes view to particular contact
    changeView:null,
    //returns whether we are viewing this in single Theater Mode
    getMode:  function(){
  	  return $('#theatre').is(':checked');
  	},
	  addChatMessage:function(msg){
  	  //@todo Add this to the window as a div
  	  //when we have the interface
  	  var chatMessage = $('<div/>').attr('class','chat-message').text( msg )
  	  $('#overview').after( chatMessage );

	  },
    refresh: _refresh
  };
})();