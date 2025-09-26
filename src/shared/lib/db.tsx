import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// async function test() {
//   const user = await db.user.create({
//     data: {
//       userName: "yeooonn",
//     },
//   });

//   // const user = await db.user.findMany({
//   //   where: {
//   //     userName: {
//   //       contains: "yeo",
//   //     },
//   //   },
//   // });

//   console.log(user);
// }

// test();

export default db;
