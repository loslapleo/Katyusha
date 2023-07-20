/*
 * Event: Triggers when a new list of songs is added to queue.
 */

module.exports = {
	name: "addList",
	distube: true,
	async execute(queue, playlist) {
		queue.textChannel.send(
			`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to the queue by ${song.user}`
		);
	},
};
