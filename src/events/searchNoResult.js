/*
 * Event: Triggers if the music player cannot find audio.
 */

module.exports = {
	name: "searchNoResult",
	distube: true,
	async execute(message, query) {
		message.channel.send(`No result found for \`${query}\``);
	},
};
