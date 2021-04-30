const { MessageEmbed } = require("discord.js");
const check = require("../../../build/extensions/check");

function shuffle(interaction, client, color) {
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

    player.queue.shuffle();

    const embed = new MessageEmbed()
      .setColor(color)
      .setTitle("Queue embaralhada");

    return interaction.reply([embed]);
  });
}

module.exports = shuffle;
