const { MessageEmbed } = require("discord.js");
const check = require("../../../build/extensions/check");

function move(interaction, client, color) {
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

    let oldIndex = interaction.options[0].value;
    let newIndex = interaction.options[1].value;

    if (
      oldIndex > player.queue.length ||
      oldIndex <= 0 ||
      newIndex > player.queue.length ||
      newIndex <= 0
    ) {
      let embed = new MessageEmbed()
        .setColor(color)
        .setTitle("Índice inválido")
        .setDescription("Índice de música inválido.");

      return interaction.reply([embed]);
    }

    if (oldIndex === newIndex) {
      let embed = new MessageEmbed()
        .setColor(color)
        .setTitle("Índice inválido")
        .setDescription("A música já está nessa posição da queue.");

      return interaction.reply([embed]);
    }

    const embed = new MessageEmbed()
      .setTitle("Música movida")
      .setDescription(
        `**${newIndex}**: [${player.queue[oldIndex - 1].title}](${
          player.queue[oldIndex - 1].uri
        })`
      );

    const element = player.queue[oldIndex - 1];
    player.queue.splice(oldIndex - 1, 1);
    player.queue.splice(newIndex - 1, 0, element);

    return interaction.reply([embed]);
  });
}

module.exports = move;
