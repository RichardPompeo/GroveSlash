const { ShardingManager, MessageEmbed, WebhookClient } = require("discord.js");
require("dotenv").config();

const shard = new ShardingManager("./index.js", {
  totalShards: 3,
  respawn: true,
  token: process.env.TOKEN,
});

shard.on("shardCreate", (shard) => {
  let hook = new WebhookClient(process.env.HOOK_ID, process.env.HOOK_TOKEN);

  const embed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle("Shard iniciada")
    .setDescription(`Shard \`${shard.id}\` iniciada com sucesso.`);

  hook.send(embed);
});

shard.spawn();
