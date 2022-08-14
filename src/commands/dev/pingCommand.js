const { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const ExtendedClient = require("../../structures/extendedClient");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check the API Latency and Client Ping"),
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {ExtendedClient} client
   */
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const newMessage = `API Latency: \`${client.ws.ping}ms\`\nClient Ping: \`${
      message.createdTimestamp - interaction.createdTimestamp
    }ms\``;
    await interaction.editReply({
      content: newMessage,
    });
  },
};
