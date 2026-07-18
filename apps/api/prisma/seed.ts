import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

// bunx prima migrate dev --name init
// bunx prisma db seed

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clean existing data
  await prisma.note.deleteMany();
  await prisma.folder.deleteMany();

  // Create root folders
  const work = await prisma.folder.create({
    data: { name: "Work" },
  });

  const personal = await prisma.folder.create({
    data: { name: "Personal" },
  });

  // Create nested folders
  const meetings = await prisma.folder.create({
    data: { name: "Meetings", parentId: work.id },
  });

  const projects = await prisma.folder.create({
    data: { name: "Projects", parentId: work.id },
  });

  const travel = await prisma.folder.create({
    data: { name: "Travel", parentId: personal.id },
  });

  // Create notes
  await prisma.note.createMany({
    data: [
      { text: "Discuss Q3 roadmap with team", folderId: meetings.id },
      { text: "Weekly standup notes - sprint 12", folderId: meetings.id },
      { text: "API redesign spec draft", folderId: projects.id },
      { text: "Set up CI/CD pipeline for new repo", folderId: projects.id },
      { text: "Book flights to Prague", folderId: travel.id },
      { text: "Grocery list: milk, eggs, bread", folderId: personal.id },
    ],
  });

  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
