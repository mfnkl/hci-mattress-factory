var myScroll;
function loaded() {
	myScroll = new iScroll('wrapper');
	
  // default to first floor, 500 buidling
  myScroll.scrollToElement('#floor-1-500', 800);
	$('a.first').parent().addClass('active');
		
  // navigate between floors in building		
	$('a.scrollTo').bind('click',function(event){
		var that = $(this);
    var element = that.attr('data-link');
    $('.nav li').removeClass('active');
    $('.nav a[data-link="'+element+'"]').parent().addClass('active');

    myScroll.scrollToElement(element, 800);
  });

  // navigate between buildings
	$('.building-title').bind('click',function(event){
		var that = $(this);
		var navItems = that.attr('data-to-show');
		var building = that.attr('data-building');
		
		$(".building.active").hide().removeClass('active');
		$("#building-"+building).show().addClass('active');
		myScroll.scrollToElement("#floor-1-"+building, 100);

		$('.nav li').removeClass('active');
		$('a.first').parent().addClass('active');

		$('.nav li[class!="building-title"]').slideUp();
		$(navItems).slideDown();
	});

  // prevent iScroll from breaking form input on details page
  var tagField = document.getElementById('tag-field');
  tagField.addEventListener('touchstart', function(e) {
    e.stopPropagation();
  }, false);
  tagField.addEventListener('mousedown', function(e) {
    e.stopPropagation();
  }, false);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

/* Use this for high compatibility (iDevice + Android)*/
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);