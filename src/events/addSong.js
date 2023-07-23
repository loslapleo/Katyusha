/*
 * Event: Triggers when a new song is added to queue.
 */

module.exports = {
	name: "addSong",
	distube: true,
	async execute(queue, song) {
		const embed = new EmbedBuilder()
		.setDescription(`Added \`${song.name}\` - \`${song.formattedDuration}\` to the queue by: ${song.user}`)
		.setColor("#edea18");
		queue.textChannel.send({ embeds: [embed] });
	},
};
