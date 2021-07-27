const isEmpty = (data) => {
  if (typeof data === "string" && data.trim().length == 0) {
    return true;
  } else if (typeof data === "object" && Object.keys(data).length == 0) {
    return true;
  }

  return false;
};

export default isEmpty;
