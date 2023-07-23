/*
 * Event: Triggers when a new song starts playing.
 */

const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "playSong",
	distube: true,
	async execute(queue, song) {
		const embed = new EmbedBuilder()
		.setDescription(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`)
		.setColor("#edea18");
		queue.textChannel.send({ embeds: [embed] });
	},
};
