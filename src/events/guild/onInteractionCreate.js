const { EmbedBuilder, CommandInteraction } = require("discord.js");
const ExtendedClient = require("../../structures/extendedClient");

module.exports = {
  name: "interactionCreate",
  /**
   * @param {CommandInteraction} interaction
   * @param {ExtendedClient} client
   */
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setColor("Red")
              .setDescription("Something went wrong"),
          ],
          ephemeral: true,
        });
      }
    }
  },
};
