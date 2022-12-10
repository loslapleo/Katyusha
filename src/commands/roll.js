/*
 * Command: /roll <max>
 *
 * <max>: maximum number
 *
 * Gives a random number between 1 and <max>.
 */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("roll")
		.setDescription("Rolls for a number between 1 and <max>.")
		.addStringOption(option => option
			.setName("max")
			.setDescription("Max number to be rolled for.")
			.setRequired(true)),
	async execute(interaction) {
		const max = interaction.options.getString("max");
		const random = Math.floor(Math.random() * parseInt(max)) + 1;
		await interaction.reply(`${random}`);
	},
};
