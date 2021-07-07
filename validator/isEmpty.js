const isEmpty = (value) => {
  const result = value
    ? (typeof value === "object" && !Object.keys(value).length) ||
      (typeof value === "string" && !value.trim().length)
    : false;
  return result;
};

module.exports = isEmpty;
