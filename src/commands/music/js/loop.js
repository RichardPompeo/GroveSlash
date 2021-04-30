const { MessageEmbed } = require("discord.js");
const check = require("../../../build/extensions/check");

function loop(interaction, client, color) {
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

    let type = interaction.options[0].value;

    const embed = new MessageEmbed().setColor(color);

    if (type === "track") {
      if (player.trackRepeat) {
        player.setTrackRepeat(false);

        embed.setTitle("Loop desativado");
        embed.setDescription("O loop para a **música** foi desativado.");
      } else {
        player.setTrackRepeat(true);

        embed.setTitle("Loop ativado");
        embed.setDescription("O loop para a **música** foi ativado.");
      }
    } else if (type === "queue") {
      if (player.queueRepeat) {
        player.setQueueRepeat(false);

        embed.setTitle("Loop desativado");
        embed.setDescription("O loop para a **queue** foi desativado.");
      } else {
        player.setQueueRepeat(true);

        embed.setTitle("Loop ativado");
        embed.setDescription("O loop para a **queue** foi ativado.");
      }
    }

    return interaction.reply([embed]);
  });
}

module.exports = loop;
