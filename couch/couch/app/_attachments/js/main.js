$(document).ready(function() {
	$.ajax({
		"url": "_view/guests",
		"dataType": "json",
		"success": function(data) {
			$.each(data.rows, function(index,guests){
				var gname = guests.value.gname;
				var contact = guestdata.contact;
				var guest = guests.guest;
				var rdate = guests.rdate;
				var attend = guests.attend;
				var aguest = guests.aguest;
				var gnotes = guests.gnotes; 
				$('#guestlist').append(
					$('<li>').append(
						$('<a>').text(title)
							.text(guests)
				);
			});
			$('#guestlist').listview('refresh');
		}
	});
});

