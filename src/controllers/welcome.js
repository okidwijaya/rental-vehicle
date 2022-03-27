const greeting = (req, res) => {
    res.status(200).json({
        msg: 'Welcome to Vehicle Renatal',
    });
};

module.exports = { greeting };