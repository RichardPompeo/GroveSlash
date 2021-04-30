const { MessageEmbed } = require("discord.js");
const check = require("../../../build/extensions/check");

function pause(interaction, client, color) {
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

    if (player.paused) {
      player.pause(false);

      let embed = new MessageEmbed()
        .setColor(color)
        .setTitle("Música resumida");

      return interaction.reply([embed]);
    } else if (!player.paused) {
      player.pause(true);

      let embed = new MessageEmbed()
        .setColor(color)
        .setTitle("Música pausada");

      return interaction.reply([embed]);
    }
  });
}

module.exports = pause;
