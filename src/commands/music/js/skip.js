const { MessageEmbed } = require("discord.js");
const check = require("../../../build/extensions/check");

function skip(interaction, client, color) {
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

    const embed = new MessageEmbed()
      .setColor(color)
      .setTitle("Música pulada")
      .setDescription(
        `[${player.queue.current.title}](${player.queue.current.uri})`
      );

    player.stop();

    return interaction.reply([embed]);
  });
}

module.exports = skip;
