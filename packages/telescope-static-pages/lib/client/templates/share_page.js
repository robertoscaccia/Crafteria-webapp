Template.share.events({
	'click input[type=submit]': function(e) {
		e.preventDefault();

		var link1 = $("#link_1").val();
		var link2 = $("#link_2").val();
		var link3 = $("#link_3").val();

		if (!link1 || !link2 || !link3)
			throwError("Devi fornire 3 links");

		var description = $("#description").val();
		var name = $("#name").val();
		var email = $("#email").val();

		if (email && !validateEmail(email))
			throwError("Indirizzo email non valido");

		Meteor.call('share', link1, link2, link3, description, name, email, function(err, res) {
			if (err)
				console.log(err)
			else
				throwError('Indirizzi inviati! Grazie');
		})
	}
})