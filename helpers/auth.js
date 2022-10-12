const bcrypt = require("bcrypt");

export async function hashPassword(password) {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  return passwordHash;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}
