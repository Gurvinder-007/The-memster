const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

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
  },
};
