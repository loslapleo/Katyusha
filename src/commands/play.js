/*
 * Command: play <song>
 *
 * <song>: song that is to be played
 *
 * Plays song that was requested by the user.
 */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Plays the song requested.")
		.addStringOption(option => option
			.setName("song")
			.setDescription("Song to be played.")
			.setRequired(true)),
	async execute(interaction) {
		if (!interaction.member.voice.channel) return await interaction.reply(
			"You must be in a voice channel to play something!");

		await interaction.reply("Adding song ...");
		const song = interaction.options.getString("song");
		interaction.client.distube.play(interaction.member.voice.channel, song, {
			member: interaction.member,
			textChannel: interaction.channel,
			interaction,
		});
		await interaction.deleteReply();
	},
};
