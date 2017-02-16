/**
 * Returns size of minimum coins set
 * @param {Number[]} coins Values of coins
 * @param {Number} mount
 * @return {Number}
 */
const atm = (values, mount, cache = {}) => {
    let minSize = +Infinity;

    // Memoization
    if (mount in cache) {
        return cache[mount];
    }

    for (let i = 0; i < values.length; i++) {
        let coin = values[i];

        if (coin === mount) {
            return cache[mount] = 1;
        } else if (coin < mount) {
            minSize = Math.min(
                atm(values, mount - coin, cache) + 1,
                minSize
            );
        }
    }

    return cache[mount] = minSize;
};

export default atm;
