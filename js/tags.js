(function(GLOBAL, $, tmpl) {
  $.parse.init({
      app_id: "LKndLqOkr8fE4AH7BcfpmJbXNJMW6ElrMPHGI7iY", // <-- enter your Application Id here
      rest_key: "wIpqcITCvjSirwsYUkGco27hXMoNPmiBHzuulflw" // <--enter your REST API Key here	
  });

  function init() {
    return GLOBAL.pieces;
  }

  function get() {
    var id = objURL[ "i" ];
	
    $.parse.get("tags", {where : { objectId: id }}, function(json) {
      var results, pieceList;

      results = json.results;
		  pieceList = results[0].pieceIds;

      console.log(pieceList);

      if (pieceList.length > 0) {
        $.parse.get('pieces', {where : { 'objectId':{'$in':pieceList} }}, function(json) {
          var results2, html;
          
          html = '<h3>Tag: '+ results[0].tagName+'</h3>';
          html += '<ul>';

          results2 = json.results;

          results2.forEach(function(piece) {
            html += tmpl("piece_tmpl", piece);
          });

          html += '</ul>';
          $('.floor').html(html);
        });        
      }

    });
  }

  GLOBAL.pieces = {
      init: init,
      get: get
  };

})(window, jQuery, tmpl);

$(function() {
    pieces.init().get();
});



