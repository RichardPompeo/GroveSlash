const { bytes, time } = require("../../../build/extensions/utils");
const AsciiTable = require("ascii-table");
table = new AsciiTable("Shards - Informações");

async function shardInfo(interaction, client) {
  interaction.thinking();

  table.setHeading(
    "Shard ID",
    "UpTime",
    "Ping",
    "Memória",
    "Servidores",
    "Players"
  );
  table.setAlign(0, AsciiTable.CENTER);
  table.setAlign(1, AsciiTable.CENTER);
  table.setAlign(2, AsciiTable.CENTER);
  table.setAlign(3, AsciiTable.CENTER);
  table.setAlign(4, AsciiTable.CENTER);
  table.setAlign(5, AsciiTable.CENTER);
  table.setBorder("|", "-", "+", "+");

  let servers = await client.shard.fetchClientValues("guilds.cache.size");
  let mem = await client.shard.broadcastEval(`process.memoryUsage().rss`);
  let ping = await client.shard.fetchClientValues("ws.ping");
  let uptime = await client.shard.fetchClientValues("uptime");
  let players = await client.shard.fetchClientValues("manager.players.size");

  for (let i = 0; i < client.options.shardCount; i++) {
    table.addRow(
      i === interaction.guild.shard.id ? i + "*" : i,
      time(uptime[i]),
      "~" + ping[i] + "ms",
      bytes(mem[i]).value + bytes(mem[i]).unit,
      servers[i].toLocaleString("pt-br"),
      players[i].toLocaleString("pt-br")
    );
  }

  let totalServers = servers.reduce((prev, val) => prev + val);
  let totalMem = mem.reduce((prev, val) => prev + val);
  let varPing = ping.reduce((prev, val) => prev + val);
  let media = varPing / client.options.shardCount;
  let totalPlayers = players.reduce((prev, val) => prev + val);

  table.addRow("______", "______", "______", "______", "______", "______");

  table.addRow(
    "TOTAL",
    "-",
    "~" + Math.round(media) + "ms",
    bytes(totalMem, 2).value + bytes(totalMem, 2).unit,
    totalServers.toLocaleString("pt-BR"),
    totalPlayers
  );

  interaction.reply(`\`\`\`css\n${table.toString()}\`\`\``, { code: "apache" });
  return table.clearRows();
}

module.exports = shardInfo;
