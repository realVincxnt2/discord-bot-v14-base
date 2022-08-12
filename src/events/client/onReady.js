const { Client } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {Client} client
   */
  async execute(client) {
    console.log(`${client.user.tag} is logged in`);
    client.user.setActivity({ name: "with discord.js v14" });
  },
};
