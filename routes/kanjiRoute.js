const express = require('express');
const { getAllQuests, getN5Quests, getN4Quests } = require('../controllers/kanjiController');

const router = express.Router();

router
    .route('/')
    .get(getAllQuests)
router
    .route('/n5')
    .get(getN5Quests)
router
    .route('/n4')
    .get(getN4Quests)


module.exports = router;