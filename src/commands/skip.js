/*
 * Command: skip
 *
 * Skips the song that is currently being played.
 */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("skip")
		.setDescription("Skips the current song."),
	async execute(interaction) {
		if (!interaction.member.voice.channel) return await interaction.reply(
			"You must be in a voice channel to skip current song!");

		let queue = interaction.client.distube.getQueue(interaction);
		if (!queue) return await interaction.reply("No songs playing ...");
		if (queue.autoplay || queue.songs.length > 1) {
			interaction.client.distube.skip(interaction);
			await interaction.reply("Skipped song ...");
		} else {
			interaction.client.distube.stop(interaction);
			await interaction.reply("Skipped song ...");
		}
	},
};
