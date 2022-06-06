const dayjs = require("dayjs");

const timestamp = (date) => {
  const dates = dayjs().format("DD, MMM, YYYY");
  return dates;
};

module.exports = timestamp;