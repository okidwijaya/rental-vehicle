const success = (res, status, data) => {
    res.status(status).json(data);
};

const error = (res, status, data) => {
    const dataError = new Error(data);
    res.status(status).json({ error: dataError });
};

module.exports = { success, error };