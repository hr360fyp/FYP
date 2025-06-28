import bcrypt from "bcryptjs";

const users = [
  {
    role: "Admin",
    name: "admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    role: "Employee",
    name: "user",
    email: "user@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
];

export default users;