const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const ExtendedClient = require("../structures/extendedClient");

/**
 * @param {ExtendedClient} client
 */
module.exports = async (client) => {
  const folders = fs.readdirSync("./src/commands");

  for (const folder of folders) {
    const files = fs
      .readdirSync(`./src/commands/${folder}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of files) {
      const command = require(`../commands/${folder}/${file}`);
      if (!command) return;

      client.commands.set(command.data.name, command);
      client.commandArray.push(command.data.toJSON());
    }
  }

  const rest = new REST({ version: "9" }).setToken(client.botConfig.token);
  try {
    console.log("Started refreshing application (/) commands");

    await rest.put(Routes.applicationGuildCommands(client.botConfig.clientId, client.botConfig.guildId), {
      body: client.commandArray,
    });

    console.log("Successfully reloaded application (/) commands");
  } catch (error) {
    console.error(error);
  }
};
