const { format, isValid } = require("date-fns");

function formatDate(date) {
  if (isValid(date)) {
    return {
      unix: date.getTime(),
      utc: format(date, "EEE',' dd MMM yyyy HH:mm:ss OO").slice(0, -2),
    };
  } else {
    return { error: date.toString() };
  }
}

module.exports = { formatDate };
