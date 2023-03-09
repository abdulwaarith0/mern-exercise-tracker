const router = require("express").Router();
let Exercise = require("../models/exercise.models");

router.route("/").get(async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.json(exercises);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

router.route("/add").post(async (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    try {
        await newExercise.save();
        res.json("Exercise added !!");
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

router.route("/:id").get(async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        res.json(exercise);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

router.route("/:id").delete(async (req, res) => {
    try {
        await Exercise.findByIdAndDelete(req.params.id);
        res.json("Exercise deleted");
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

router.route("/update/:id").post(async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
        await exercise.save();
        res.json("Exercise updated");
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});


module.exports = router;
