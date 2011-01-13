var model = {
	saveContact : function(contact) {
		proton.db('contacts').save(contact);		
	},
	searchContactsByName : function(searchName) {
		var query = { name : searchName };
		return proton.db('contacts').find(query);
	},
	allContacts : function() {
		return proton.db('contacts').all();		
	}
};

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
	},
	getSerachName : function() {
		return $('#searchName').val();
	}
};

var controller = (function() {

	function displayContacts(contacts) {
		clearResults();
		contacts = sortContacts(contacts);
		addContacts(contacts);
	}
	
	function clearResults() {
		view.clearResults();
	}
	
	function sortContacts(contacts) {
		var sort = { name : proton.ascending };
		return contacts.order(sort);
	}
	
	function addContacts(contacts) {
		contacts.forEach(addContact);
	}
	
	function addContact(contact) {
		view.addResult([ contact.name, contact.email, contact.twitter, contact.beverage ]);
	}
	
	return {
		onAddClick : function() {
			var contact = {
				name : view.getName(),
				email : view.getEmail(),
				twitter : view.getTwitter(),
				beverage : view.getBeverage()
			};
			model.saveContact(contact);
		},
		onSearchClick : function() {
			var searchName = view.getSerachName();
			var contacts = model.searchContactsByName(searchName);
			displayContacts(contacts);
		},
		onShowAllClick : function() {
			var contacts = model.allContacts();
			displayContacts(contacts);
		}
	};
})();

$(document).ready(function() {

	$('#add').click(function() {
		controller.onAddClick();
	});

	$('#search').click(function() {
		controller.onSearchClick();
	});

	$('#showAll').click(function() {
		controller.onShowAllClick();
	});

});