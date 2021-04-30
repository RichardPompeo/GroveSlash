const { MessageEmbed } = require("discord.js");

function config(interaction, client, color) {
  interaction.thinking();

  const player = client.manager.players.get(interaction.guild.id);

  if (!player) {
    let embed = new MessageEmbed()
      .setColor(color)
      .setTitle("Sem queue")
      .setDescription(
        "Não há músicas tocando nesse servidor, use **/play** para ouvir."
      );

    return interaction.reply([embed]);
  }

  const embed = new MessageEmbed()
    .setColor(color)
    .setTitle("Efeitos")
    .setAuthor(
      interaction.guild.name,
      interaction.guild.iconURL({ dynamic: true })
    )
    .addFields(
      {
        name: "BassBoost",
        value: player.bassboost ? "Ativado" : "Desativado",
        inline: true,
      },
      {
        name: "Distortion",
        value: player.distortion ? "Ativado" : "Desativado",
        inline: true,
      },
      { name: "\u200b", value: "\u200b", inline: true },
      {
        name: "NightCore",
        value: player.nightcore ? "Ativado" : "Desativado",
        inline: true,
      },
      {
        name: "VaporWave",
        value: player.vaporwave ? "Ativado" : "Desativado",
        inline: true,
      },
      { name: "\u200b", value: "\u200b", inline: true },
      {
        name: "Loop Song",
        value: player.trackRepeat ? "Ativado" : "Desativado",
        inline: true,
      },
      {
        name: "Loop Queue",
        value: player.queueRepeat ? "Ativado" : "Desativado",
        inline: true,
      },
      {
        name: "\u200b",
        value: "\u200b",
        inline: true,
      },
      {
        name: "Volume",
        value: player.volume,
        inline: true,
      },
      {
        name: "Velocidade",
        value: player.speed,
        inline: true,
      }
    );

  return interaction.reply([embed]);
}

module.exports = config;
