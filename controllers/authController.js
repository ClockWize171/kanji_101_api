const catchAsync = require("../utils/catchAsync");

exports.routeProtect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        if (token === process.env.SERVER_PASSWD) {
            return next();
        } else {
            res.status(401).json({
                status: 'fail',
                message: 'Wrong key'
            })
        }
    } else {
        res.status(401).json({
            status: 'fail',
            message: 'You need to key to create, update & delete quests. Contact with administractor.'
        })
    }
})