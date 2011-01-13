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

var controller = (function() {

	function displayContacts(contacts) {
		view.clearResults();
		var sort = { name : proton.ascending };
		contacts.order(sort).forEach(function(contact) {
			view.addResult([ contact.name, contact.email, contact.twitter, contact.beverage ]);
		});
	}

	return {
		onAddClick : function() {
			var contact = {
				name : view.getName(),
				email : view.getEmail(),
				twitter : view.getTwitter(),
				beverage : view.getBeverage()
			};
			proton.db('contacts').save(contact);
		},
		onSearchClick : function() {
			var query = { name : $('#searchName').val() };
			displayContacts(proton.db('contacts').find(query));
		},
		onShowAllClick : function() {
			displayContacts(proton.db('contacts').all());
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