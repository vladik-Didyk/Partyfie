const express = require("express");
const router = express.Router();
const { createSession, joinSession, getSessionQueue, addToQueue, removeFromQueue } = require("../data/session");

router.get("/", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const { token, password, maxNumListeners, sessionName } = req.body;
    const { _id, created_date, session_name } = await createSession(
      token,
      password,
      maxNumListeners,
      sessionName
    );
    res.status(201).send({ session_id: _id, session_name, created_date });
  } catch (err) {
    next(err);
  }
});

router.post("/join", async (req, res, next) => {
  try {
    const { token, sessionName, password } = req.body;
    const sessionId = await joinSession(token, sessionName, password);
    res.status(200).send({ sessionId });
  } catch (err) {
    next(err);
  }
});

router.get("/:id/queue", async(req, res, next) => {
  try {
    const { id } = req.params;
    const queue = await getSessionQueue(id);
    res.status(200).send({ queue });
  } catch (err) {
    next(err);
  }
});

router.post("/:id/queue", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { uri } = req.body;
    const updatedQueue = await addToQueue(id, uri);
    res.status(201).send({ queue: updatedQueue });
  } catch (err) {
    next(err);
  }
});

router.put("/:id/queue", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { uri } = req.body;
    await removeFromQueue(id, uri);
    res.status(201).send({ message: "Song removed from queue" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
