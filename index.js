const fs = require("node:fs");
const path = require("node:path");
const cron = require("node-cron");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");
// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
  axios
    .get("https://meme-api.herokuapp.com/gimme")
    .then((response) => {
      client.channels.cache
        .get(process.env.memechannel)
        .send(response.data.url);
    })
    .catch((error) => {
      console.log(error);
    });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

cron.schedule("* 0 0 * * *", () => {
  axios
    .get("https://meme-api.herokuapp.com/gimme")
    .then((response) => {
      client.channels.cache
        .get(process.env.memechannel)
        .send(response.data.url);
    })
    .catch((error) => {
      console.log(error);
    });
});

client.login(process.env.token);
