Template.leader.events({
	'click input[type=submit]': function(e) {
		e.preventDefault();

		var err = false;

		var name = $("#name").val();
		var email = $("#email").val();
		var message = $("#message").val();

		if (!name) {
			err = true;
			throwError("Nome è necessario");
		}
			
		if (!email) {
			err = true;
			throwError("Email è necessario");
		} else if (!validateEmail(email)) {
			err = true;
			throwError("Indirizzo email non valido");
		}

		if (!err) {
			Meteor.call('leader', name, email, message, function(err, res) {
				if (err)
					console.log(err);
				else
					throwError('La tua richiesta è stata inviata');
			});
		}
	}
});