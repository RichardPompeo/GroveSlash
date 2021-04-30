const { MessageEmbed } = require("discord.js");
const { client } = require("../../index");

client.on("message", (message) => {
  if (message.author.bot) return;

  if (
    message.content.startsWith("<@") &&
    message.content.endsWith(client.user.id + ">")
  ) {
    let embed = new MessageEmbed()
      .setColor(message.guild.me.roles.highest.color)
      .setTitle(message.author.username)
      .setDescription(`Digite **/ajuda** para ver a lista de comandos.`);
    message.channel.send(embed);
  }
});
