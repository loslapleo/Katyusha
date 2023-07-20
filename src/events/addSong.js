/*
 * Event: Triggers when a new song is added to queue.
 */

module.exports = {
	name: "addSong",
	distube: true,
	async execute(queue, song) {
		queue.textChannel.send(
			`Added \`${song.name}\` - \`${song.formattedDuration}\` to the queue by ${song.user}`
		);
	},
};
