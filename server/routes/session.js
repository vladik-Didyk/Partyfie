const express = require('express');
const router = express.Router();

//create a session, join a session

router.post('/create', async (req, res, next) => {
    try {
        const token = req.body;
    } catch (err) {
        next(err);
    }
    
    // from the create session form, take the information and create a table row with the user creating it as the token
});

router.post('/join/:sessionId', async (req, res, next) => {
    try {
        
    } catch (err) {
        next(err);
    }
});

module.exports = router;
