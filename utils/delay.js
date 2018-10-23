const delay = (timeInSeconds) => new Promise((resolve) => setTimeout(resolve, timeInSeconds * 1000));

module.exports = delay;
