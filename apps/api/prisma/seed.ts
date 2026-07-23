import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

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

  // Create nested folders (level 2)
  const meetings = await prisma.folder.create({
    data: { name: "Meetings", parentId: work.id },
  });

  const projects = await prisma.folder.create({
    data: { name: "Projects", parentId: work.id },
  });

  const travel = await prisma.folder.create({
    data: { name: "Travel", parentId: personal.id },
  });

  // Create nested folders (level 3)
  const sprintPlanning = await prisma.folder.create({
    data: { name: "Sprint Planning", parentId: meetings.id },
  });

  const retrospective = await prisma.folder.create({
    data: { name: "Retrospective", parentId: meetings.id },
  });

  const nextjsMigration = await prisma.folder.create({
    data: { name: "Next.js Migration", parentId: projects.id },
  });

  const marketingWebsite = await prisma.folder.create({
    data: { name: "Marketing Website", parentId: projects.id },
  });

  const vacation2024 = await prisma.folder.create({
    data: { name: "Vacation 2024", parentId: travel.id },
  });

  // Create notes for root and level 2 folders
  await prisma.note.createMany({
    data: [
      { text: "Prepare presentation for Monday", folderId: work.id },
      { text: "Buy groceries", folderId: personal.id },
      { text: "Call plumber", folderId: personal.id },
      { text: "Discuss Q3 roadmap with team", folderId: meetings.id },
      { text: "Weekly standup notes - sprint 12", folderId: meetings.id },
      { text: "API redesign spec draft", folderId: projects.id },
      { text: "Set up CI/CD pipeline for new repo", folderId: projects.id },
      { text: "Book flights to Prague", folderId: travel.id },
    ],
  });

  // Create notes for level 3 folders
  await prisma.note.createMany({
    data: [
      {
        text: "Define sprint goals for next week",
        folderId: sprintPlanning.id,
      },
      {
        text: "Assign story points to backlog items",
        folderId: sprintPlanning.id,
      },
      { text: "What went well last sprint", folderId: retrospective.id },
      { text: "Action items from retro", folderId: retrospective.id },
      {
        text: "Migrate pages router to app router",
        folderId: nextjsMigration.id,
      },
      {
        text: "Update data fetching to server components",
        folderId: nextjsMigration.id,
      },
      {
        text: "Redesign landing page hero section",
        folderId: marketingWebsite.id,
      },
      { text: "Add testimonials section", folderId: marketingWebsite.id },
      { text: "Pack sunscreen and charger", folderId: vacation2024.id },
      { text: "Book airport transfer", folderId: vacation2024.id },
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
