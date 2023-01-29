const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const Kanji = require('../models/kanjiModel')
const APIFeatures = require('../utils/apiFeatures')

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