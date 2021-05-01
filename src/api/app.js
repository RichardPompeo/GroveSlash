const { client } = require("../../index");

const express = require("express");

const app = express();

app.use("/api/guild/:id", (req, res) => {
  const id = req.params.id;

  const guild = client.guilds.cache.get(id);
  const player = client.manager.players.get(id);

  if (!guild) {
    return res.status(404).send({
      error: "This guild ID is invalid.",
    });
  }

  if (!player) {
    return res.status(404).send({
      error: "This guild doesn't have a player.",
    });
  }

  res.status(200).send({
    message: "OK",
    options: player.options,
    queue: player.queue,
  });
});

module.exports = app;
