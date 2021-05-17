const express = require('express');
const router = express.Router();
const { createSession, joinSession } = require("../data/session");

router.get('/', async (req, res, next) => {
    try {
        
    } catch (err) {
        next(err);
    }
});

router.post('/create', async (req, res, next) => {
    try {
        const { token, password, maxNumListeners, sessionName } = req.body;
        const { _id, created_date, session_name } = await createSession(token, password, maxNumListeners, sessionName);
        res.status(201).send({ session_id: _id, session_name, created_date });
    } catch (err) {
        next(err);
    }
});

router.post('/join', async (req, res, next) => {
    try {
        const { token, sessionId, password } = req.body;
        await joinSession(token, sessionId, password);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
