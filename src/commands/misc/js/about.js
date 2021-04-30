const { MessageEmbed } = require("discord.js");
const { bytes, time } = require("../../../build/extensions/utils");
const os = require("os");

async function about(interaction, client, color) {
  interaction.thinking();

  let servers = await client.shard.fetchClientValues("guilds.cache.size");
  let totalServers = servers.reduce((prev, val) => prev + val);

  let mem = await client.shard.broadcastEval(`process.memoryUsage().rss`);
  let totalMem = mem.reduce((prev, val) => prev + val);

  const embed = new MessageEmbed()
    .setColor(color)
    .setTitle("Informações")
    .addFields(
      {
        name: "Equipe",
        value: `<@389866221295763456>, <@449240801520779266> e <@617123227243642881>`,
        inline: false,
      },
      {
        name: "Colaboradores",
        value: `<@704468807229505637>`,
        inline: false,
      },
      {
        name: "Me adicione",
        value: `[Clique aqui](https://discord.com/oauth2/authorize?client_id=712785958231080990&permissions=0&scope=bot%20applications.commands)`,
        inline: true,
      },
      {
        name: "Servidor de suporte",
        value: "[Clique aqui](https://discord.gg/wDPvreyZTU)",
        inline: true,
      },
      { name: "\u200b", value: "\u200b", inline: true },
      {
        name: "Servidores",
        value: totalServers.toLocaleString("pt-br"),
        inline: true,
      },
      {
        name: "Shards",
        value: client.shard.count,
        inline: true,
      },
      {
        name: "\u200b",
        value: "\u200b",
        inline: true,
      },
      {
        name: "Memória",
        value: `${bytes(totalMem).value}${bytes(totalMem).unit} / ${
          bytes(os.totalmem()).value
        }${bytes(os.totalmem()).unit}`,
        inline: true,
      },
      {
        name: "Ping",
        value: `${client.ws.ping}ms`,
        inline: true,
      },
      {
        name: "UpTime",
        value: time(client.uptime),
        inline: false,
      }
    );

  return interaction.reply([embed]);
}

module.exports = about;
