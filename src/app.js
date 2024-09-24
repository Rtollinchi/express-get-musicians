const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/musicians", async (req, res) => {
  const allMusicians = await Musician.findAll();

  res.json(allMusicians);
});

app.get("/musicians/:id", async (req, res, next) => {
  try {
    const musician = await Musician.findByPk(req.params.id);
    res.json(musician);
  } catch (error) {
    next(error);
  }
});

app.post("/musicians", async (req, res, next) => {
  try {
    const newMusician = await Musician.create(req.body);
    res.json(newMusician);
  } catch (error) {
    next(error);
  }
});

app.put("/musicians/:id", async (req, res, next) => {
  try {
    await Musician.update(req.body, {
      where: { id: req.params.id },
    });

    const updatedMusician = await Musician.findByPk(req.params.id);
    res.json(updatedMusician);
  } catch (error) {
    next(error);
  }
});

app.delete("/musicians/:id", async (req, res, next) => {
  try {
    const deleteMusician = await Musician.destroy({
      where: { id: req.params.id },
    });
    res.json(deleteMusician);
  } catch (error) {
    next(error);
  }
});
module.exports = app;
