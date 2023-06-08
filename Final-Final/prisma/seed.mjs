import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ["query"],
});

async function seed() {
  let request = await fetch(
    "https://raw.githubusercontent.com/cmps350s2023/cmps350-content-m/main/project/users.json"
  );
  let data = await request.json();
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    await prisma.user.create({ data: { ...data[i], id: undefined } });
  }
}

seed();
