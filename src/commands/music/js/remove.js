const { MessageEmbed } = require("discord.js");
const check = require("../../../build/extensions/check");

function remove(interaction, client, color) {
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

    if (index > player.queue.length || index <= 0) {
      let embed = new MessageEmbed()
        .setColor(color)
        .setTitle("Índice inválido")
        .setDescription("Índice de música inválido.");

      return interaction.reply([embed]);
    }

    const embed = new MessageEmbed()
      .setColor(color)
      .setTitle("❌ Música removida")
      .setDescription(
        `[${player.queue[index - 1].title}](${player.queue[index - 1].uri})`
      );

    player.queue.splice(index - 1, 1);

    return interaction.reply([embed]);
  });
}

module.exports = remove;
