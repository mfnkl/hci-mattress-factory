(function(GLOBAL, $, tmpl) {
  
  var piece_list, piece_detail; 

  $.parse.init({
      app_id: "LKndLqOkr8fE4AH7BcfpmJbXNJMW6ElrMPHGI7iY", // <-- enter your Application Id here
      rest_key: "wIpqcITCvjSirwsYUkGco27hXMoNPmiBHzuulflw" // <--enter your REST API Key here	
  });

  function init() {
    piece_list = $("#gallery");
    piece_detail = $("#piece_detail");
    return GLOBAL.pieces;
  }

  function get() {
    
    $.parse.get("pieces", { order : "-floorId" }, function(json) {
        var results,
        html;

        var floorCounter = 4;

        results = json.results;
        html = "";
        console.log(results);

        if (results.length === 0) {
            return false;
        }

        html += '<section class="floor" id="floor-4"><ul>';
        results.forEach(function(piece) {
            

            if (piece.floorId != floorCounter) {
              html += '</ul></section>';

            while (floorCounter - piece.floorId > 1) {
              floorCounter -= 1;
              html += '<section class="floor" id="floor-'+ floorCounter +'">';
              if (floorCounter == 1) {
                html += tmpl("welcome_message", piece);
              }
              html +='</section>';
            }

              html += '<section class="floor" id="floor-'+ piece.floorId +'"><ul>';
              floorCounter -= 1;
            }
            
            html += tmpl("piece_tmpl", piece);

        });
        html += '</ul></section>';
        piece_list.html(html);
    });
    
  }

  function getPiece(objectId) {
      var objectId = objectId;

      $.parse.get("pieces", { 'objectId': objectId }, function(json) {

        var results, html;

        results = json.results;
        html = "";

        if (results.length === 0) {
            return false;
        }

        results.forEach(function(task) {
            html += tmpl("piece_detail_tmpl", task);
        });
        piece_detail.html(html);
    });
  }

  GLOBAL.pieces = {
      init: init,
      get: get
  };

})(window, jQuery, tmpl);

$(function() {
    pieces.init().get();

    $('#navbar a').live("click",function(event) {
      var $anchor = $(this);
      $('body').animate({scrollTop: $($anchor.attr('href')).offset().top - 60}, 500);
      event.preventDefault();
    });
});



