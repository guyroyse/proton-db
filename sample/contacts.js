var view = {
	clearResults : function() {
		$('#results').get(0).innerHTML = '';
	},
	addResult : function(values) {
		var table = $('#results').get(0);
		var row = table.insertRow(-1);
		for ( var i = 0; i < values.length; i++) {
			row.insertCell(i).innerHTML = values[i];
		}
	},
	getName : function() {
		return $('#name').val();
	},
	getEmail : function() {
		return $('#email').val();
	},
	getTwitter : function() {
		return $('#twitter').val();
	},
	getBeverage : function() {
		return $('#beverage').val();
	}
};

$(document).ready(function() {

	$('#add').click(function() {
		var contact = {
			name : view.getName(),
			email : view.getEmail(),
			twitter : view.getTwitter(),
			beverage : view.getBeverage()
		};
		proton.db('contacts').save(contact);
	});

	$('#search').click(function() {
		var contacts = proton.db('contacts').find({
			name : $('#searchName').val()
		});
		displayContacts(contacts);
	});

	$('#showAll').click(function() {
		var contacts = proton.db('contacts').all();
		displayContacts(contacts);
	});

});

function displayContacts(contacts) {
	view.clearResults();
	var table = $('#results').get(0);
	contacts.order({
		name : proton.ascending
	}).forEach(
			function(contact) {
				view.addResult([ contact.name, contact.email, contact.twitter,
						contact.beverage ]);
			});
}