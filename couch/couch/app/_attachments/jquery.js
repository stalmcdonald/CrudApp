//Crystal McDonald
//Full Sail University
//ASD 1203 week 4
//RSVP App


	
$("#guestForm").validate({
    submitHandler: function(form) {
        console.log("Call Action");
    }
});

// placeholders
window.onload = function() {
  applyDefaultplaceholder(document.getElementById('gname'), 'Enter the Guest Name');
  applyDefaultplaceholder(document.getElementById('contact'), 'Add Guest Photo');
  
}

function applyDefaultplaceholder(elem, val) {
  elem.style.color = '#999';
  elem.placeholder = val;
  elem.onfocus = function() {
    if(this.placeholder == val) {
      this.style.color = '';
      this.placeholder = '';
    }
  }
  elem.onblur = function() {
    if(this.placeholder == '') {
      this.style.color = '#999';
      this.placeholder = val;
    }
  }
}

/* Date Validation */
$(document).ready( function() {
    var now = new Date();
    var today = now.getMonth() + '/' + now.getDate() + '/' + now.getFullYear();
    $('#rdate').val(today);
});
$.mobile.selectmenu.prototype.options.hidePlaceholderMenuItems = false;



// LOAD DATA FROM OUTSIDE APP


// Couch data
$('#jsonbutton').bind('click', function(){
	$('#guestdata').empty();
	$('<p>').html('Import Couch Data').appendTo('#guestdata');
	$.ajax({
		url: 'guest.json',
		type: 'GET',
		dataType: 'json',
		success: function(respond){
        	for (var i=0, g=respond.myguests.length; i<g; i++){
				var gdata = respond.myguests[i];
				$(''+
					'<div class="guestlabels">'+
						'<h3>'+ gdata.gname +'</h3>'+
						'<img src="'+ gdata.contact +'" />'+
						'<p>Guest Label: '+ gdata.guest +'</p>'+
						'<p>RSVP\'d Date: '+ gdata.rdate +'</p>'+
						'<p>Attending: '+ gdata.attend +'</p>'+
						'<p>Additonal Guest: '+ gdata.aguest +'</p>'+
						'<p>Notes: '+ gdata.gnotes +'</p>'+
					'</div>'
				).appendTo('#guestdata');
				console.log(respond);
			}
		}
	});
	return false;
});


// This code retreives the list view of my data

$('#guestCouch').live("pageshow", function(){
	$.couch.db("rsvp").view("rsvp/guests",{
			success: function(data) {
			$('#guestCouchList').empty();
			$.each(data.rows, function(index, value){
				var id = value.id;
				var item = (value.value || value.doc);
				 $('#guestCouchList').append(
				 	$('<li>').append(
				 		$('<a>').attr("href", "guest.html?guest=" + id)
				 		.html('<img src="'+ item.contact +'" />'+
				 			  '<h3>'+item.gname+'</h3>'+
				 			  '<p>'+item.gnotes+'</p>'
				 		)
				 	)
				 );		 
			}); 
			$('#guestCouchList').listview('refresh');
		}
	});
});

//Grabs the key

var urlVars = function(){
	var urlData = $($.mobile.activePage).data("url");
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[1].split('&');
	var urlValues = {};
	for(var pair in urlPairs){
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	return urlValues;
};

// individual view on new page

$('#guest').live("pageshow", function(){
	var guest = urlVars()["guest"];
		
	$.couch.db("rsvp").openDoc(guest, {
    	success: function(data) {
    			var gname = data.gname;
				var contact = data.contact;
				var rdate = data.rdate;
				var guest = data.guest;
				var aguest = data.aguest;
				var gnotes = data.gnotes;
        	$('<div class="individual">'+
        			'<h3>Guest Name: '+ gname +'</h3>'+
					'<ul class="inner">'+
					'<li><img src="'+ contact +'" /></li>'+
					'<li>Guest Label: '+ guest +'</li>'+
					'<li>RSVP\'d Date: '+ rdate +'</li>'+
					'<li>Additonal Guest: '+ aguest +'</li>'+
					'<li>Notes: '+ gnotes +'</li>'+
					'<li><a href="#" id="edit-guest-link">Edit Guest</a></li>' + 
		        	'<li><a href="#" id="delete-guest-link">Delete Guest</a></li>'+
					'</ul>'+
					'</div>' 
        	  
        	).appendTo('#guestListItems');
        	
        	$('#delete-guest-link').live('click', function(){
        		var ask = confirm("All information about this guest will be deleted. Delete Guest Now??");
        		if(ask) {
        		$.couch.db("rsvp").removeDoc(data, {
        			
        			success: function(data) {
        				console.log(data);
        				document.location.href = 'index.html';
        			},
        			error: function(status) {
        				console.log(status);
        			}
        		});
        		}else{ 
        			alert("Guest could not be deleted..");
        			document.location.href = 'index.html';
        		}
        	});
        }
	});
});

// Editing Guest info

$('#edit-guest-link').live('click', function(){
	var guest = urlVars()["guests"];
	$.mobile.changePage("index.html#addguest");
	$.couch.db("rsvp").openDoc(design, {
    	success: function(data) {
    		gname = data.gname;
    		contact = data.contact;
    		guest = data.guest;
    		rdate = data.rdate;
    		aguest = data.aguest;
    		gnotes = data.gnotes;
			$('#gname').val(gname);
		    $('#contact').val(contact);
		    $('#guest').val(guest);
		    $('#rdate').val(rdate);
		    $('#aguest').val(aguest);
		    $('#gnotes').val(gnotes);
        
			// show edit item button, hide submit button
			var editButton = $('#edit-item-button').css('display', 'block');
			var subresButtons = $('#submit-reset-buttons').css('display', 'none');
			var itemList = $('#glist').css('display', 'none');
			
			// Save guest changes
			$('#edit-item').bind('click', function(){
				console.log("edit-item button was pressed");
				var gname = $('#gname').val();
			    var contact = $('#contact').val();
			    var rdate = $('#rdate').val();
			    var guest = $('#guest').val();
				var aguest = $('#aguest').val();
			    var gnotes = $('#gnotes').val();
			    var item = {
					"_id": data._id,
					"_rev": data._rev,
					"gname": gname,
					"contact": contact,
					"rdate": rdate,
					"guest": guest,
					"aguest": aguest,
					"gnotes": gnotes		
					};
					console.log(item);
				
				$.couch.db("rsvp").saveDoc(item, {
					success: function(data) {
						console.log(data);
						alert("Guest was edited successfully.");
						document.location.href = 'index.html';
					},
					error: function(status) {
        				console.log(status);
        				alert("Guest could not be edited.");
    				}
				});
			return false;
			});
		}
	});
	
});




// Save Guest Info

$('#submit').bind('click', function(){
	var d = new Date();
    var myid = (d.getTime());
	var gname = $("#gname").val();
    var contact = $("#contact").val();
     var guest = $("#guest").val();
    var rdate = $("#rdate").val();
    var aguest = $("#aguest").val();
    var gnotes = $("#gnotes").val();
    var item = {
    	"_id": "design:" + guest + ":" + myid,
    	"gname": gname, 
    	"contact": contact,
    	"guest": guest, 
    	"rdate": rdate, 
     	"aguest": aguest, 
    	"gnotes": gnotes
    };
	console.log(item);
	$.couch.db("rsvp").saveDoc(item, {
		success: function(data) {
			console.log(data);
			alert("Guest Added Successfully");
			document.location.href = 'index.html'; 
		},
		error: function(status) {
			console.log(status);
			alert("Guest could not be created.");
		}
	});
return false;

});


