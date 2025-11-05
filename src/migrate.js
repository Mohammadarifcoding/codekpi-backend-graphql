const { PrismaClient } = require("@prisma/client");
const { MongoClient } = require("mongodb");

const prisma = new PrismaClient();
const mongo = new MongoClient(process.env.MONGO_URL);

async function migrateReviews() {
  await mongo.connect();
  const reviews = await mongo
    .db("Codekpi")
    .collection("reviews")
    .find({})
    .toArray();
  console.log(reviews.length, "reviews found");

  const departmentMap = {
    CST: "COMPUTER",
    CT: "COMPUTER",
    ET: "ELECTRICAL",
    MT: "MECHANICAL",
    ENT: "ELECTRONICS",
    PT: "POWER",
    RAC: "RAC",
  };
  const shortSession = (session) =>
    session
      .split("-")
      .map((v, i) => (i === 0 ? v.slice(2) : v))
      .join("-");
  // const sessionMap = {
  //   "2018-19": "18_19",
  //   "2019-20": "19_20",
  //   "2020-21": "20_21",
  //   "2021-22": "21_22",
  //   "2022-23": "22_23",
  //   "2023-24": "23_24",
  //   "2024-25": "SESSION_24_25",
  //   "2025-26": "SESSION_24_25",
  // };

  const shiftMap = { "Morning Shift": "MORNING", "Day Shift": "EVENING" };

  let completedNumber = 0;

  for (const review of reviews) {
    try {
      const image = await prisma.picture.create({
        data: { image: review.userImage },
      });

      await prisma.review.create({
        data: {
          name: review.name,
          text: review.text,
          rating: review.rating,
          department: departmentMap[review.department] || "COMPUTER",
          session: shortSession(review.session),
          shift: shiftMap[review.shift] || "MORNING",
          userImage: { connect: { id: image.id } },
          createdAt: review.createdAt ? new Date(review.createdAt) : new Date(),
          status: "APPROVED",
        },
      });

      completedNumber++;
      console.log(`Migrated ${completedNumber} / ${reviews.length}`);
    } catch (err) {
      console.error(`Failed to migrate review ${review._id}:`, err.message);
    }
  }

  await mongo.close();
  await prisma.$disconnect();
  console.log("Migration completed ✅");
}

migrateReviews().catch((err) => {
  console.error(err);
  process.exit(1);
});
