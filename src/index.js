const ExtendedClient = require("./structures/extendedClient");
const fs = require("fs");

const client = new ExtendedClient();
module.exports = client;

const handlers = fs.readdirSync("./src/handlers");
for (const handler of handlers) require(`./handlers/${handler}`)(client);

client.login(client.botConfig.token);
