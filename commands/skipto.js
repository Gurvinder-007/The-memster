const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skipto")
    .setDescription("Skips to a certain track #")
    .addNumberOption((option) =>
      option
        .setName("tracknumber")
        .setDescription("The track to skip to")
        .setMinValue(1)
        .setRequired(true)
    ),
  async execute({ client, interaction }) {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue)
      return await interaction.reply("There are no songs in the queue");

    const trackNum = interaction.options.getNumber("tracknumber");
    if (trackNum > queue.tracks.length)
      return await interaction.reply("Invalid track number");
    queue.skipTo(trackNum - 1);

    await interaction.reply(`Skipped ahead to track number ${trackNum}`);
  },
};
