const express = require('express');
const {
    getAllQuests,
    getOneQuest,
    getN5Quests,
    getN4Quests,
    createQuest,
    updateQuest,
    deleteQuest } = require('../controllers/kanjiController');

const router = express.Router();

router
    .route('/')
    .get(getAllQuests)
    .post(createQuest)

router
    .route('/n5')
    .get(getN5Quests)

router
    .route('/n4')
    .get(getN4Quests)
    
router
    .route('/:id')
    .get(getOneQuest)
    .patch(updateQuest)
    .delete(deleteQuest)



module.exports = router;