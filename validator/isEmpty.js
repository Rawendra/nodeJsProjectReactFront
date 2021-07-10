const isEmpty = (value) => {
  //if object and keys array is empty then it is empty
  //if string and trim lenght is still zero, it is empty
  //if array and the lenght of array is zero, it is empty
  const result = value
    ? (Array.isArray(value) && !value.length) ||
      (typeof value === "object" && !Object.keys(value).length) ||
      (typeof value === "string" && !value.trim().length)
    : true;
  return result;
};

module.exports = isEmpty;
