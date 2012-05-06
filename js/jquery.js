
// Save Guests

$('#submit').live('click', function saveData(id) {
    var contact = $("#contact").val();
    var gname = $("#gname").val();
    var guest = $("#guest").val();
    var d = new Date();
    var key = (d.getTime());
    var rdate = $("#rdate").val();
    var attend;
    if ($('#attend').is(":checked")){
attend = "Yes"
}else{
attend = "No"
}
    var aguest = $("#aguest").val();
    var gnotes = $("#gnotes").val();
    var item = [gname, contact, rdate, guest, attend, aguest, gnotes];
    localStorage.setItem(key, item);
    location.reload();
    alert("Guest Saved!");
});

function toggleControls(n) {
    switch (n) {
    case "on":
        $('#guestForm').css('display', 'none');
        $('#clearLink').css('display', 'inline');
        break;
    case "off":
        $('#guestForm').css('display', 'block');
        $('#clearLink').css('display', 'inline');
        $('#glist').css('display', 'none');
        break;
    default:
        return false;
    }
}

// Display Guests

$('#contactImage').live('click', function getData() {
toggleControls("on");
    var getgListDiv = $('#glist')[0];
    for (var i = 0, j = localStorage.length; i < j; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        value = value.split(',');

        $('<div>').attr({
            'class': 'glistDiv'
        }).appendTo('#glist');
        $('<h3>').html(value[0]).appendTo('.glistDiv');
        $('<img>').attr({
            'src': value[1],
            'width': '300'
        }).appendTo('.glistDiv');
        $('<p>').html('RSVP Date: ' + value[2]).appendTo('.glistDiv');
        $('<p>').html('Category: ' + value[3]).appendTo('.glistDiv');
        $('<p>').html('Attending: ' + value[4]).appendTo('.glistDiv');
        $('<p>').html('Additional Guest: ' + value[5]).appendTo('.glistDiv');
        $('<p>').html('Notes: ' + value[6]).appendTo('.glistDiv');
        $('<p>').html($('<a>').attr({
            'href': '#',
            'onclick': 'deleteItem(' + key + ');'
        }).html('Delete Guest')).appendTo('.glistDiv');
        $('<p>').html($('<a>').attr({
            'href': '#',
            'onclick': 'editItem(' + key + ');'
        }).html('Edit Guest')).appendTo('.glistDiv');

    }
});


// Edit Guests

function editItem(id) {
    var itemId = id;
var value = localStorage.getItem(itemId);
value = value.split(',');
toggleControls("off");
    var contact = value[1];
    var guest = value[2];
    var gname = value[0];
    var rdate = value[3];
    var attend;
    var aguest = value[5];
    var gnotes = value[6];

    $('#contact').val(contact);
    $('#guest').val(guest);
    $('#gname').val(gname);
    $('#rdate').val(rdate);
    if ($('#attend').is(":checked")){
attend = "Yes"
}else{
attend = "No"
}
$('#aguest').val(aguest);
    $('#gnotes').val(gnotes);

    // show edit item button, hide submit button
    var editButton = $('#edit-item-button').css('display', 'block');
    var subresButtons = $('#submit-reset-buttons').css('display', 'none');
    var itemList = $('#glist').css('display', 'none');

    // when clicking editItem button
    $('#edit-item').live('click', function clickEdit() {
        var contact = $('#contact').val();
        var guest = $('#guest').val();
        var gname = $('#gname').val();
        var rdate = $('#rdate').val();
        var attend;
        if ($('#attend').is(":checked")){
attend = "Yes"
}else{
attend = "No"
}
        var aguest = $('#aguest').val();
        var gnotes = $('#gnotes').val();
        var item = [
        gname, contact, rdate, guest, attend, aguest, gnotes];
     
        localStorage.setItem(itemId, item);
        location.reload();
        alert("Guest Edit Successful!");
        
    });

}


// Delete Guests

function deleteItem(id) {
    var ask = confirm("Delete Guest Now?");
    if (ask) {
        localStorage.removeItem(id);
        window.location.reload();
    } else {
        alert("Guest remains on the Guest List.");
    }
}


// Clear guest info

function clearLocal() {
    if (localStorage.length === 0) {
        alert("There is no data to clear.");
    } else {
        localStorage.clear();
        alert("All data has been removed from local storage!");
        window.location.reload();
        return false;
    }
}


$("#guestForm").validate({
    submitHandler: function(form) {
        console.log("");
    }
});

//placeholders for Guest Name & Guest Photo areas on form.
window.onload = function() {
 defaultPlaceHolder(document.getElementById('gname'), 'Enter guest name here.');
  defaultPlaceHolder(document.getElementById('contact'), 'Add photo here. Optional.');
  
}

function defaultPlaceHolder(elem, val) {
  elem.style.color = '#ccc';
  elem.placeholder = val;
  elem.onfocus = function() {
    if(this.placeholder == val) {
      this.style.color = '';
      this.placeholder = '';
    }
  }
  elem.onblur = function() {
    if(this.placeholder == '') {
      this.style.color = '#ccc';
      this.placeholder = val;
    }
  }
}

//calendar get date
$(document).ready( function() {
    var now = new Date();
    var today = now.getMonth() + '/' + now.getDate() + '/' + now.getFullYear();
    $('#rdate').val(today);
});
$.mobile.selectmenu.prototype.options.hidePlaceholderMenuItems = true;

window.onload = function() {
// JSON List
$('#jsondata').bind('click', function(){
$('#guestdata').empty();
$('<p>').html('JSON Data Imported').appendTo('#guestdata');
$.ajax({
url: 'xhr/guest.json',
type: 'GET',
dataType: 'json',
success: function(answer){
         for (var i=0, j=answer.theguests.length; i<j; i++){
var jdata = answer.theguests[i];
$(''+
'<div class="guestinfo">'+
'<h3>'+ jdata.gname +'</h3>'+
'<img src="'+ jdata.contact +'" />'+
'<p>Category: '+ jdata.guest +'</p>'+
'<p>RSVP Date: '+ jdata.rdate +'</p>'+
'<p>Attending: '+ jdata.attend +'</p>'+
'<p>Additional Guest: '+ jdata.aguest +'</p>'+
'<p>Notes: '+ jdata.gnotes +'</p>'+
'</div>'
).appendTo('#guestdata');
console.log(answer);
}
}
});
return false;
});

// XML List
$('#xmldata').bind('click', function(){
$('#guestdata').empty();
$('<p>').html('XML Data Imported').appendTo('#guestdata');
$.ajax({
url: 'xhr/guest.xml',
type: 'GET',
dataType: 'xml',
success: function(xml){
$(xml).find("reservedGuest").each(function(){
    var contact = $(this).find('contact').text();
    var guest = $(this).find('guest').text();
    var gname = $(this).find('gname').text();
    var rdate = $(this).find('rdate').text();
    var attend = $(this).find('attend').text();
    var aguest = $(this).find('aguest').text();
    var gnotes = $(this).find('gnotes').text();
     $(''+
'<div class="guestinfo">'+
'<h3>'+ gname +'</h3>'+
'<img src="'+ contact +'" />'+
'<p>Category: '+ guest +'</p>'+
'<p>RSVP Date: '+ rdate +'</p>'+
'<p>Attending: '+ attend +'</p>'+
'<p>Additional Guest: '+ aguest +'</p>'+
'<p>Notes: '+ gnotes +'</p>'+
'</div>'
).appendTo('#guestdata');
console.log(xml);
});
}
});
return false;
});


//CSV List
$('#csvdata').bind('click', function(){
$('#guestdata').empty();
$('<p>').html('CSV Data Imported').appendTo('#guestdata');
$.ajax({
        type: "GET",
        url: "xhr/guest.csv",
        dataType: "text",
        success: function(data) {
         var allInfo = data.split(/\r\n|\n/);
     var headers = allInfo[0].split(',');
     var info = [];

for (var i=1; i<allInfo.length; i++) {
var data = allInfo[i].split(',');
if (data.length == headers.length) {
var guests = [];

for (var j=0; j<headers.length; j++) {
guests.push(data[j]);
}
info.push(guests);
}

}

for (var m=0; m<info.length; m++){
var acontact = info[m];
$(''+
'<div class="guestinfo">'+
'<h3>'+ acontact[0] +'</h3>'+
'<img src="'+ acontact[1] +'" />'+
'<p>Category: '+ acontact[2] +'</p>'+
'<p>Attending: '+ acontact[3] +'</p>'+
'<p>RSVP Date: '+ acontact[4] +'</p>'+
'<p>Additional Guest: '+ acontact[5] +'</p>'+
'<p>Notes: '+ acontact[6] +'</p>'+
'</div>'
).appendTo('#guestdata');
console.log(info);
}
        }
});
return false;
});
}

//~Week 4~
// This code retrieves the list view of my data 

$('#mycouch').live("pageshow", function(){
	$.couch.db("asdproject").view("gal/designs",{
			success: function(data) {
			$('#couchlist').empty();
			$.each(data.rows, function(index, value){
				var id = value.id;
				var item = (value.value || value.doc);
				 $('#couchlist').append(
				 	$('<li>').append(
				 		$('<a>').attr("href", "design.html?design=" + id)
				 		.html('<img src="'+ item.durl +'" />'+
				 			  '<h3>'+item.dname+'</h3>'+
				 			  '<p>'+item.notes+'</p>'
				 		)
				 	)
				 );		 
			}); 
			$('#couchlist').listview('refresh');
		}
	});
});

//This grabs the key

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

// creating another page to view the list

$('#design').live("pageshow", function(){
	var design = urlVars()["design"];
		
	$.couch.db("asdproject").openDoc(design, {
    	success: function(data) {
    			var dname = data.dname;
				var durl = data.durl;
				var ddate = data.ddate;
				var groups = data.groups;
				var appeal = data.appeal;
				var notes = data.notes;
        	$('<div class="individual">'+
        			'<h3>Design Name: '+ dname +'</h3>'+
					'<ul class="inner">'+
					'<li><img src="'+ durl +'" /></li>'+
					'<li>Category: '+ groups +'</li>'+
					'<li>Date Discovered: '+ ddate +'</li>'+
					'<li>Design Appeal: '+ appeal +'</li>'+
					'<li>Notes: '+ notes +'</li>'+
					'<li><a href="#" id="edit-design-link">Edit Design</a></li>' + 
		        	'<li><a href="#" id="delete-design-link">Delete Design</a></li>'+
					'</ul>'+
					'</div>' 
        	  
        	).appendTo('#designitems');
        	
        	$('#delete-design-link').live('click', function(){
        		var ask = confirm("Are you sure you want to delete this design?");
        		if(ask) {
        		$.couch.db("asdproject").removeDoc(data, {
        			
        			success: function(data) {
        				console.log(data);
        				document.location.href = 'index.html';
        			},
        			error: function(status) {
        				console.log(status);
        			}
        		});
        		}else{ 
        			alert("Sorry, design not removed.");
        			document.location.href = 'index.html';
        		}
        	});
        }
	});
});

// Edits Guests

$('#edit-design-link').live('click', function(){
	var design = urlVars()["design"];
	$.mobile.changePage("index.html#adddesign");
	$.couch.db("asdproject").openDoc(design, {
    	success: function(data) {
    		dname = data.dname;
    		durl = data.durl;
    		ddate = data.ddate;
    		groups = data.groups;
    		appeal = data.appeal;
    		notes = data.notes;
			$('#dname').val(dname);
		    $('#durl').val(durl);
		    $('#ddate').val(ddate);
		    $('#groups').val(groups);
			$('#appeal').val(appeal);
		    $('#notes').val(notes);
        
			// show edit item button, hide submit button
			var editButton = $('#edit-item-button').css('display', 'block');
			var subresButtons = $('#submit-reset-buttons').css('display', 'none');
			var itemList = $('#list').css('display', 'none');
			
			// saving changes made
			$('#edit-item').bind('click', function(){
				console.log("edit-item button was pressed");
				var dname = $('#dname').val();
			    var durl = $('#durl').val();
			    var ddate = $('#ddate').val();
			    var groups = $('#groups').val();
				var appeal = $('#appeal').val();
			    var notes = $('#notes').val();
			    var item = {
					"_id": data._id,
					"_rev": data._rev,
					"dname": dname,
					"durl": durl,
					"ddate": ddate,
					"groups": groups,
					"appeal": appeal,
					"notes": notes		
					};
					console.log(item);
				
				$.couch.db("asdproject").saveDoc(item, {
					success: function(data) {
						console.log(data);
						alert("Design was updated!");
						document.location.href = 'index.html';
					},
					error: function(status) {
        				console.log(status);
        				alert("Design was not updated.");
    				}
				});
			return false;
			});
		}
	});
	
});




// save item

$('#submit').bind('click', function(){
	var d = new Date();
    var myid = (d.getTime());
	var dname = $("#dname").val();
    var durl = $("#durl").val();
    var ddate = $("#ddate").val();
    var groups = $("#groups").val();
    var appeal = $("#appeal").val();
    var notes = $("#notes").val();
    var item = {
    	"_id": "design:" + groups + ":" + myid,
    	"dname": dname, 
    	"durl": durl, 
    	"ddate": ddate, 
    	"groups": groups, 
    	"appeal": appeal, 
    	"notes": notes
    };
	console.log(item);
	$.couch.db("asdproject").saveDoc(item, {
		success: function(data) {
			console.log(data);
			alert("Design was added!");
			document.location.href = 'index.html'; 
		},
		error: function(status) {
			console.log(status);
			alert("Design was not added.");
		}
	});
return false;

});
