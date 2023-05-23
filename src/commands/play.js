/*
 * Command: play <song>
 *
 * <song>: song that is to be played
 *
 * Plays song specified using YouTube.
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
		const song = interaction.options.getString("song");
		await interaction.reply(`${song}`);
	},
};
