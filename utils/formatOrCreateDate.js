function formatOrCreateDate(date) {
  if (!date) {
    return new Date();
  }
  if (Number.isNaN(Number(date))) {
    return new Date(date);
  }
  return new Date(Number(date));
}

module.exports = { formatOrCreateDate };
