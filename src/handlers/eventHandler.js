const fs = require("fs");
const ExtendedClient = require("../structures/extendedClient");

/**
 * @param {ExtendedClient} client
 */
module.exports = (client) => {
  const folders = fs.readdirSync("./src/events");

  for (const folder of folders) {
    const files = fs
      .readdirSync(`./src/events/${folder}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of files) {
      const event = require(`../events/${folder}/${file}`);
      if (!event) return;

      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }
};
