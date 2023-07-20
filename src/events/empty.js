/*
 * Event: Triggers when queue is empty.
 */

module.exports = {
	name: "empty",
	distube: true,
	async execute(channel) {
		channel.send(`Voice channedl is empty! Leaving the channel...`);
	},
};
