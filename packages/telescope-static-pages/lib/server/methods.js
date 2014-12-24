Meteor.methods({
	leader: function(name, email, message) {
		check(name, String);
		check(email, String);
		check(message, Match.Optional(String));

		if (!validateEmail(email))
			throw new Meteor.Error(500, "Invalid Email");

		var emailSubject = 'New Leader Application';
		emailProperties = {
			name: name,
			email: email,
			message: message
		}

		buildAndSendEmail('hello@crafteria.it', emailSubject, getTemplate('leaderApplication'), emailProperties);

	},
	share: function(link1, link2, link3, description, name, email) {
		check(link1, String);
		check(link2, String);
		check(link3, String);
		check(description, Match.Optional(String));
		check(name, Match.Optional(String));
		check(email, Match.Optional(String));

		if (email && !validateEmail(email))
			throw new Meteor.Error(500, "Invalid Email");

		var emailSubject = 'New Links Shared';
		emailProperties = {
			link1: link1,
			link2: link2,
			link3: link3,
			description: description,
			name: name,
			email: email
		}

		buildAndSendEmail('hello@crafteria.it', emailSubject, getTemplate('sharedLinks'), emailProperties);
		
	}
});