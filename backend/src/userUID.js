const ShortUniqueId = require('short-unique-id');

const userUID = new ShortUniqueId({
    length: 8,
    dictionary: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
});

module.exports = () => {
    return '#' + userUID.rnd();
};
