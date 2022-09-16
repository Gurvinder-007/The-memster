const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Replies with a meme!"),
  async execute({ client, interaction }) {
    axios
      .get("https://meme-api.herokuapp.com/gimme")
      .then((response) => {
        interaction.reply(response.data.url);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
