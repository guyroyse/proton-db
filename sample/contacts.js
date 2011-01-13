$(document).ready(function() {
	
	$('#add').click(function() {
		var contact = {
			name : $('#name').val(),
			email : $('#email').val(),
			twitter : $('#twitter').val(),
			beverage : $('#beverage').val()
		};
		proton.db('contacts').save(contact);
	});
	
	$('#search').click(function() {
		var contacts = proton.db('contacts').find({name: $('#searchName').val()});
		displayContacts(contacts);
	});
	
	$('#showAll').click(function() {
		var contacts = proton.db('contacts').all();
		displayContacts(contacts);
	});

});

function displayContacts(contacts) {
	var table = $('#results').get(0);
	table.innerHTML = '';
	contacts.order({name: proton.ascending}).forEach(function(contact) {
		var row = table.insertRow(-1);
		
		var nameCell = row.insertCell(0);
		var emailCell = row.insertCell(1);
		var twitterCell = row.insertCell(2);
		var beverageCell = row.insertCell(3);
		
		nameCell.innerHTML = contact.name;
		emailCell.innerHTML = contact.email;
		twitterCell.innerHTML = contact.twitter;
		beverageCell.innerHTML = contact.beverage;
	});
}