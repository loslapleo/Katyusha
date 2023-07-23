/*
 * Event: Triggers when a new list of songs is added to queue.
 */

const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "addList",
	distube: true,
	async execute(queue, playlist) {
		const embed = new EmbedBuilder()
		.setDescription(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to the queue by: ${song.user}`)
		.setColor("#edea18");
		queue.textChannel.send({ embeds: [embed] });
	},
};
