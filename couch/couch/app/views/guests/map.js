$("#jsondata").ready(function(){
$('#guestdata').empty();
$('<p>').html('JSON Data Imported').appendTo('#guestdata');

$.ajax({
"url": "xhr/guest.json",
"dataType": "json",
"success": function(answer){
$.each(data.rows, function(index, guest){
var guest = guest.value.guest;
var contact = guest.value.contact;
var gname = guest.value.gname;
var rdate = guest.value.rdate;
var attend = guest.value.attend;
var gnotes = guest.value.gnotes;

$('#guestdata').append(
$('<div>').attr ("data-role", "collapsible").attr("data-collapsed", "true" )
.append($('<h3>').attr("id", id).text(gname))
.append($('<img>').attr("src", "images/Other.png").attr("alt", "").attr( "class", "pic"))
.append($('<p>').text("Reservation Date: " + rdate))
.append($('<p>').text("Attending: " + attend))
.append($('<p>').text("Notes: " + gnotes))
.append($('<p>').text("Guests: " + guest))
);
});
}
});
});








/*
function(doc) {
  if (doc._id.substr(0,6)==="Guest:"){
    emit(doc._id.substr(6), {
    	"gname": doc.gname,
    	"contact": doc.contact,
    	"guest": doc.guest,
    	"rdate": doc.rdate,
     	"attend": doc.attend,
    	"aguest": doc.aguest,
    	"gnotes": doc.gnotes
    });
  }
};
*/