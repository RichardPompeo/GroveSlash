const { MessageEmbed } = require("discord.js");

function help(interaction, color) {
  interaction.thinking();

  const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor(
      interaction.guild.me.user.username,
      interaction.guild.me.user.avatarURL()
    )
    .addFields(
      {
        name: "Sobre",
        value:
          "Sou um bot Brasileiro com suporte a diversas plataformas de Streaming!",
        inline: false,
      },
      {
        name: "WebSite",
        value:
          "Em meu site você pode saber mais sobre mim! [Clique aqui!](https://grovebot.tk)",
        inline: false,
      },
      {
        name: "Comandos",
        value:
          "Para ver minha lista de comandos, [clique aqui!](https://grovebot.tk/commands)",
        inline: false,
      }
    );

  return interaction.reply([embed]);
}

module.exports = help;
