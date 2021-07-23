export const validateRegistrationUser = (user) => {
  if (!user.name || !user.password || !user.email) {
    return { errors: "user has empty fields" };
  }
  if (user.password !== user.password2) {
    return { errors: "passwords don't match" };
  }
  return { errors: false };
};
