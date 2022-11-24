/*
 * Event: Displays message in console if bot has logged in and is online.
 */

const { Events } = require("discord.js");

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`[ UPDATE ] ${client.user.tag} is now online.`);
	},
};
