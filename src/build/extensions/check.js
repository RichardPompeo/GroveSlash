const { MessageEmbed } = require("discord.js");

async function check(interaction) {
  const promise = await new Promise((res, rej) => {
    interaction.thinking();

    const { channel } = interaction.member.voice;
    const color = interaction.guild.me.roles.highest.color;

    if (!channel) {
      let embed = new MessageEmbed()
        .setTitle("Erro")
        .setColor(color)
        .setDescription("❌ Você precisa se conectar a um canal de voz.");

      interaction.reply([embed]);

      return res(false);
    } else if (!channel.joinable) {
      let embed = new MessageEmbed()
        .setTitle("Erro")
        .setColor(color)
        .setDescription(
          "❌ Não tenho permissão para me conectar a esse canal."
        );

      interaction.reply([embed]);

      return res(false);
    } else if (!channel.viewable) {
      let embed = new MessageEmbed()
        .setTitle("Erro")
        .setColor(color)
        .setDescription("❌ Não tenho permissão para ver esse canal.");

      interaction.reply([embed]);

      return res(false);
    } else if (
      interaction.guild.me.voice.channel &&
      channel.id !== interaction.guild.me.voice.channel.id
    ) {
      let embed = new MessageEmbed()
        .setTitle("Erro")
        .setColor(color)
        .setDescription("❌ Você precisa estar no mesmo canal de voz que eu.");

      interaction.reply([embed]);

      return res(false);
    } else {
      return res(true);
    }
  });

  return promise;
}

module.exports = check;
