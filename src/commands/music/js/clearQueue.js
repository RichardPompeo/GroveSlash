const { MessageEmbed } = require("discord.js");
const check = require("../../../build/extensions/check");

function clearQueue(interaction, client, color) {
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

    player.queue.splice(0, player.queue.length);

    const embed = new MessageEmbed().setColor(color).setTitle("Queue limpa");

    return interaction.reply([embed]);
  });
}

module.exports = clearQueue;
