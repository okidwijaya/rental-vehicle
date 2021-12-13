const success = (res, status, data) => {
    res.status(status).json({ result: data });
};

const error = (res, status, data) => {
    const dataError = new Error(data);
    res.status(status).json({ error: dataError.message });
};

module.exports = { success, error };