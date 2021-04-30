const { MessageEmbed } = require("discord.js");
const check = require("../../../build/extensions/check");

function volume(interaction, client, color) {
  check(interaction).then((res) => {
    if (!res) return;

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

    let index = interaction.options[0].value;

    if (index > 100 || index <= 0) {
      let embed = new MessageEmbed()
        .setColor(color)
        .setTitle("Volume inválido")
        .setDescription("Volume de música inválido.");

      return interaction.reply([embed]);
    }

    player.setVolume(index);

    const embed = new MessageEmbed()
      .setColor(color)
      .setTitle("Volume alterado")
      .setDescription("O volume foi alterado para **" + player.volume + "**");

    return interaction.reply([embed]);
  });
}

module.exports = volume;
