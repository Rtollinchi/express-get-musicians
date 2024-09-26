const express = require("express");
const router = express.Router();
const { Musician } = require("../models/index");

router.get("/", async (req, res) => {
  const allMusicians = await Musician.findAll();

  res.json(allMusicians);
});

router.get("/:id", async (req, res, next) => {
  try {
    const musician = await Musician.findByPk(req.params.id);
    res.json(musician);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newMusician = await Musician.create(req.body);
    res.json(newMusician);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
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

router.delete("/:id", async (req, res, next) => {
  try {
    const deleteMusician = await Musician.destroy({
      where: { id: req.params.id },
    });
    res.json(deleteMusician);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
