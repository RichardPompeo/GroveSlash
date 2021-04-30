const { MessageEmbed } = require("discord.js");
const { porgressBar } = require("music-progress-bar");
const { time2 } = require("../../../build/extensions/utils");

function np(interaction, client, color) {
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

  const { title, author, duration, uri } = player.queue.current;

  const progressBar = porgressBar(
    {
      currentPositon: player.position > 0 ? player.position : "1",
      endPositon: duration,
      width: 12,
      barStyle: "▬",
      currentStyle: "🔘",
    },
    {
      format: " **  <bar>  ** ",
    }
  );

  let embed = new MessageEmbed()
    .setColor(color)
    .setAuthor(author, interaction.author.avatarURL({ dynamic: true }))
    .setTitle(title)
    .setURL(uri)
    .setDescription(
      `${player.playing ? "▶️" : "⏸️"}  ${progressBar}  \`[${
        player.position <= 60000
          ? `${time2(player.position)}s`
          : time2(player.position)
      }/${time2(duration)}]\``
    );

  return interaction.reply([embed]);
}

module.exports = np;
