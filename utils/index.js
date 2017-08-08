const getSocketById = (id, sockets) => {
    for (let key in sockets) {
        if (sockets[key]._id === id)
            return sockets[key];
    }
    return null;
};

module.exports = {
    getSocketById
};