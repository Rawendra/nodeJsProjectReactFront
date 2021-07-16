const isEmpty = require("./isEmpty");
const validatePost = (post) => {
  const keys = Object.keys(post);
  const err = {};
  err.status = true;
  for (key of keys) {
    if (isEmpty(post[key])) {
      err[key] = { msg: `${key} is required` };
      err.status = false;
    }
  }
  return err;
};
module.exports = validatePost;
