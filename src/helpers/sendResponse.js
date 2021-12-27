const success = (res, status, data) => {
    res.status(status).json({ result: data, msg: 'success' });
};

const error = (res, status, data) => {
    const dataError = new Error(data);
    res.status(status).json({ error: dataError.message });
};

module.exports = { success, error };

// .then(({ status, result }) => {
//     res.status(status).json({
//         msg: 'Success',
//         result: {
//             result,
//         },
//     });
// })
// .catch(({ status, err }) => {
//     res.status(status).json({ msg: "Terjadi Error", err });
// });