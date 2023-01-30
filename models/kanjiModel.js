const mongoose = require('mongoose');

const kanjiSchema = new mongoose.Schema({
    level: {
        type: String,
        enum: ['n5', 'n4', 'n3', 'n2, n1'],
        required: [true, "Please provide level."]
    },
    question: {
        type: String,
        required: [true, "Please provide the questions."]
    },
    correct_answer: {
        type: String,
        required: [true, "Please provide one correct answer."]
    },
    incorrect_answer: [{
        type: String,
        required: true,
        validate: {
            validator: function (v, x, z) {
                return !(this.incorrect_answer.length !== 3);
            },
            message: "A incorrect_answer should be only 3 items"
        },
    }],
},
    { versionKey: false })

const Kanji = mongoose.model('Kanji', kanjiSchema);

module.exports = Kanji;