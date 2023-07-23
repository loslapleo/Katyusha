/*
 * Event: Triggers when queue is empty.
 */

module.exports = {
	name: "empty",
	distube: true,
	async execute(channel) {
		channel.send(`Voice channel is empty! Leaving the channel...`);
	},
};
