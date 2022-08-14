const ExtendedClient = require("../../structures/extendedClient");

module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {ExtendedClient} client
   */
  async execute(client) {
    console.log(`${client.user.tag} is logged in`);
    client.user.setActivity({ name: "with discord.js v14" });
  },
};
