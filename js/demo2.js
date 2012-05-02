(function(GLOBAL, $, tmpl) {
  
  var content, tag_list, new_tag;

  $.parse.init({
      app_id: "LKndLqOkr8fE4AH7BcfpmJbXNJMW6ElrMPHGI7iY", // <-- enter your Application Id here
      rest_key: "wIpqcITCvjSirwsYUkGco27hXMoNPmiBHzuulflw" // <--enter your REST API Key here	
  });

  function init() {
    content = $("#content");
	tagfield = $("#tagfield");
	
	tag_list = $("#tag_list");
    new_tag = $("#new_tag");
    tag_table = $("#tag_table");
	
    _addEvents();
    return GLOBAL.pieces;
  }
  
  function _newTag(e) {
    console.log("newTag begin");
	var val, tag;
	
    if (e.which !== 13) {
        return true;
    }
    val = this.value;
	console.log("val: " + val);

    if (!val) {
		console.log("newTag: if (!val) return false");
        return false;
    }

    //clear value
    this.value = "";
	

	var piece, id, oldpieces, tagCounts;
	
	id = objURL[ "i" ];
	
	$.parse.get("pieces", {where : { objectId: id }}, function(json) {
		console.log("get objectId: ", json.results[0].objectId);
		console.log("get pieceName: ", json.results[0].pieceName);
		tagCounts = json.results[0].tagCounts;
		console.log("tagCounts ", tagCounts);
		
		var tagExists = -1;
		if (tagCounts.hasOwnProperty(val)) {
			tagExists = 0;
			console.log("tag exists");
		}
		
		if (tagExists < 0) { // if piece does NOT have this tag
			console.log("tag does not exist");
			// set count of tag to 1
			tagCounts[val] = 1;
			
			// update piece tags to newtags
			$.parse.put("pieces/" + id, { tagCounts: tagCounts }, function(json) {
				console.log('updated piece tags ' + id, json)
			});
			
			// check if tag exists in Tags
			$.parse.get("tags", {where : {"tagName": val}}, function(json) {
				results = json.results;
				console.log("check if tag exists in Tags");
				// if Tags does not contain tag, add tag
				if (results.length == 0) {
					console.log("tag not in Tags");
					tag = $(tmpl("tag_tmpl", { objectId: false, tagName: val, pieceNames: [id] }));
					tag_list.append(tag);
					console.log("added to tag_list");
					
					 $.parse.post('tags', { tagName: val, pieceNames: [id] }, function(json) { 
						tag.data('id', json.objectId);
						console.log("new tagid ", json.objectId);
						console.log("new tagid ", json.createdAt);
					});
					console.log("posted");
				}
				else { // else add piece to tag
					console.log("tag is in Tags");
					oldpieces = json.results[0].pieceNames;
					console.log("oldpieces ", oldpieces);
					
					newpieces = oldpieces.concat(id);
					console.log("newpieces ", newpieces);
					
					tagId = json.results[0].objectId;
					
					$.parse.put("tags/" + tagId, { pieceNames: newpieces }, function(json) {
						console.log('updated tag pieces' + id, json)
					});
				}
			});
		}
		else { // if the piece already has this tag
			// piece's tag count ++
			tagCounts[val] = tagCounts[val] + 1;
			
			// update piece tags to new tags
			$.parse.put("pieces/" + id, { tagCounts: tagCounts }, function(json) {
				console.log('updated piece tags ' + id, json)
			});
		}
		var newHTML = "";
		for (var key in tagCounts) {
			newHTML += "<span>"+key+"("+tagCounts[key]+")</span>"
		}
		document.getElementById("tags").innerHTML = newHTML;
		
	});
	
  }

  function _addEvents() {	
	content.delegate("input", "keydown", _newTag);

  }


  function get() {
    var id = objURL[ "i" ];
	
	$.parse.get("pieces", {where : { objectId: id }}, function(json) {
        var results,
        html;

        results = json.results;
        html = "";
		
		console.log(results);

        if (results.length === 0) {
            return false;
        }

        results.forEach(function(piece) {
            html += tmpl("piece_tmpl", piece);
        });
        content.html(html);
		
		console.log(content.html(html));
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



