/*
 * Event: Triggers when music player encoutered an error.
 */

module.exports = {
	name: "error",
	distube: true,
	async execute(channel, e) {
		if (channel) channel.send(`An error was encountered: ${e.toString().slice(0, 1974)}`);
		else {
			console.log(`[ ERROR ] An error was encountered with DisTube`);
			console.error(e);
		}
	},
};
