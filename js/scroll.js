// Borrowed from tutorial: 
// http://tympanus.net/codrops/2010/06/02/smooth-vertical-or-horizontal-page-scrolling-with-jquery/

function addClickListeners(myScroll) {
	$('a.scrollTo').click(function(event){
		alert("clicked");
    	var element = $(this).attr('data-link');
    	myScroll.scrollToElement('#'+element, 100);
  	});
}
