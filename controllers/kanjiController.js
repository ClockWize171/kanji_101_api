const catchAsync = require('../utils/catchAsync')
const Kanji = require('../models/kanjiModel')
const APIFeatures = require('../utils/apiFeatures')


/// GET CONTROLLERS ///
exports.getAllQuests = catchAsync(async (req, res, next) => {
    try {
        const totalItems = await Kanji.countDocuments();
        const features = new APIFeatures(Kanji.find(), req.query, totalItems)
            .filter()
            .limitFields()
            .paginate()

        const quests = await features.query;

        res.status(200).json({
            status: 'success',
            results: quests.length,
            data: { quests }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
});

exports.getOneQuest = catchAsync(async (req, res, next) => {
    const quest = await Kanji.findById(req.params.id);
    if (quest === null) {
        res.status(404).send({
            status: 'fail',
            message: "Quest not found!"
        });
    }
    try {
        res.status(200).json({
            status: 'success',
            data: {
                quest
            },
        })
    } catch (error) {
        res.status(404).send({
            status: 'fail',
            message: "Quest not found!"
        });
    }
});

exports.getN5Quests = catchAsync(async (req, res, next) => {
    try {
        const totalItems = await Kanji.countDocuments({ level: "n5" });
        const features = new APIFeatures(Kanji.find({ level: "n5" }), req.query, totalItems)
            .filter()
            .limitFields()
            .paginate()

        const n5quests = await features.query;

        res.status(200).json({
            status: 'success',
            results: n5quests.length,
            data: { quests: n5quests }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
});

exports.getN4Quests = catchAsync(async (req, res, next) => {
    try {
        const totalItems = await Kanji.countDocuments({ level: "n4" });
        const features = new APIFeatures(Kanji.find({ level: "n4" }), req.query, totalItems)
            .filter()
            .limitFields()
            .paginate()

        const n4quests = await features.query;

        res.status(200).json({
            status: 'success',
            results: n4quests.length,
            data: { quests: n4quests }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
});

/// POST CONTROLLERS ///
exports.createQuest = catchAsync(async (req, res, next) => {
    try {
        const newQuest = await Kanji.create(req.body)
        res.status(201).json({
            status: 'success',
            data: { quest: newQuest }
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
})


/// PATCH CONTROLLERS ///
exports.updateQuest = catchAsync(async (req, res, next) => {
    try {
        const quest = await Kanji.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: false
        });
        res.status(200).json({
            status: 'success',
            data: { quest },
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
})


/// DELETE CONTROLLERS ///
exports.deleteQuest = catchAsync(async (req, res, next) => {
    const quest = await Kanji.findByIdAndDelete(req.params.id);
    if (!quest) {
        res.status(404).json({
            status: 'fail',
            message: 'This quest is not here!'
        });
    }
    try {
        res.status(201).json({
            status: 'success',
            data: 'Deleted successfully!'
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
})
