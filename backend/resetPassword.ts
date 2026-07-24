import bcrypt from "bcryptjs";
import prisma from "./src/config/prisma";

async function resetPassword() {

  const hash = await bcrypt.hash("gayathri123", 10);

  await prisma.users.update({
    where: {
      email: "gayathri@gmail.com"
    },
    data: {
      password: hash
    }
  });

  console.log("Password updated successfully");
}

resetPassword();