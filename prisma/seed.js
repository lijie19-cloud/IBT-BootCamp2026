import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe123!", 12);

  const customer = await db.user.upsert({
    where: {
      email: "customer@addiseats.local",
    },

    update: {},

    create: {
      name: "Demo Customer",

      email: "customer@addiseats.local",

      passwordHash,

      role: "CUSTOMER",
    },
  });

  const staff = await db.user.upsert({
    where: {
      email: "staff@addiseats.local",
    },

    update: {},

    create: {
      name: "Demo Staff",

      email: "staff@addiseats.local",

      passwordHash,

      role: "STAFF",
    },
  });

  const menuCount = await db.menuItem.count();

  if (menuCount === 0) {
    await db.menuItem.createMany({
      data: [
        {
          name: "Doro Wot",
          description: "Traditional Ethiopian spicy chicken stew.",
          price: 450,
        },
        {
          name: "Tibs",
          description: "Delicious Ethiopian sautéed meat.",
          price: 500,
        },
        {
          name: "Kitfo",
          description: "Traditional Ethiopian minced beef dish.",
          price: 550,
        },
        {
          name: "Shiro",
          description: "Classic Ethiopian chickpea stew.",
          price: 250,
        },
      ],
    });
  }

  console.log("Seed completed.");

  console.log("Customer:", customer.email);

  console.log("Staff:", staff.email);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
