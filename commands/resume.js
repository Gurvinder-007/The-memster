const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resumes the music"),
  async execute({ client, interaction }) {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue)
      return await interaction.reply("There are no songs in the queue");

    queue.setPaused(false);
    await interaction.reply(
      "Music has been paused! Use `/pause` to resume the music"
    );
  },
};
