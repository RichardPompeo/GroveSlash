const { MessageEmbed } = require("discord.js");
const check = require("../../../build/extensions/check");

function join(interaction, client, color) {
  check(interaction).then((res) => {
    if (!res) return;

    const { channel } = interaction.member.voice;

    let play = client.manager.players.get(interaction.guild.id);

    if (!play) {
      const player = client.manager.create({
        guild: interaction.guild.id,
        voiceChannel: channel.id,
        textChannel: interaction.channel.id,
        selfDeafen: true,
      });

      player.connect();
    }

    const embed = new MessageEmbed()
      .setColor(color)
      .setTitle("Conectado")
      .setDescription(`Conectado ao canal **${channel.name}** com sucesso.`);

    return interaction.reply([embed]);
  });
}

module.exports = join;
