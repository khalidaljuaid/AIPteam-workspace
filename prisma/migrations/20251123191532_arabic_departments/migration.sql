/*
  Warnings:

  - You are about to drop the `ActivityLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ranking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectMembers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `endDate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `User` table. All the data in the column will be lost.
  - Added the required column `expectedEnd` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `milestones` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectName` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectType` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamMembers` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startDate` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "ActivityLog_createdAt_idx";

-- DropIndex
DROP INDEX "ActivityLog_action_idx";

-- DropIndex
DROP INDEX "ActivityLog_userId_idx";

-- DropIndex
DROP INDEX "Comment_userId_idx";

-- DropIndex
DROP INDEX "Comment_taskId_idx";

-- DropIndex
DROP INDEX "Ranking_category_idx";

-- DropIndex
DROP INDEX "Ranking_period_idx";

-- DropIndex
DROP INDEX "Ranking_userId_idx";

-- DropIndex
DROP INDEX "Task_projectId_idx";

-- DropIndex
DROP INDEX "Task_assignedToId_idx";

-- DropIndex
DROP INDEX "Task_priority_idx";

-- DropIndex
DROP INDEX "Task_status_idx";

-- DropIndex
DROP INDEX "_ProjectMembers_B_index";

-- DropIndex
DROP INDEX "_ProjectMembers_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ActivityLog";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Comment";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Ranking";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Task";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Team";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProjectMembers";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ContentPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "publishDate" DATETIME NOT NULL,
    "contentType" TEXT NOT NULL,
    "writer" TEXT NOT NULL,
    "captionLinkedIn" TEXT NOT NULL,
    "captionX" TEXT NOT NULL,
    "captionInstagram" TEXT NOT NULL,
    "designLink" TEXT NOT NULL,
    "contentAfterReview" TEXT NOT NULL,
    "reviewer" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "publishedLinkedIn" BOOLEAN NOT NULL DEFAULT false,
    "publishedX" BOOLEAN NOT NULL DEFAULT false,
    "publishedInstagram" BOOLEAN NOT NULL DEFAULT false,
    "publishedTikTok" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "DepartmentTask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "followerMember" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "responsibleDept" TEXT NOT NULL,
    "responsibleMember" TEXT NOT NULL,
    "assignDate" DATETIME NOT NULL,
    "deadline" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "EventTracking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "followerMember" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "eventDate" DATETIME NOT NULL,
    "stage" TEXT NOT NULL,
    "responsibleDept" TEXT NOT NULL,
    "stageDeadline" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "DisciplineRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "followerMember" TEXT NOT NULL,
    "violatorName" TEXT NOT NULL,
    "violationDate" DATETIME NOT NULL,
    "responsibleDept" TEXT NOT NULL,
    "violation" TEXT NOT NULL,
    "actionTaken" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Sponsor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sponsorName" TEXT NOT NULL,
    "sponsorshipType" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "relatedEvent" TEXT NOT NULL,
    "sponsorAccounts" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "responsibleMember" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CreativeTask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "memberName" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "textualContent" TEXT,
    "driveLink" TEXT,
    "canvaLink" TEXT,
    "deliveryDate" DATETIME NOT NULL,
    "priority" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "decision" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "EducationalContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "courseName" TEXT NOT NULL,
    "memberName" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "deadline" DATETIME NOT NULL,
    "taskLink" TEXT,
    "status" TEXT NOT NULL,
    "reviewStatus" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "activityName" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "location" TEXT,
    "responsibleTeam" TEXT NOT NULL,
    "budget" REAL,
    "attendees" INTEGER,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Collaboration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "departments" TEXT NOT NULL,
    "members" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "deadline" DATETIME,
    "status" TEXT NOT NULL,
    "sharedResources" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectName" TEXT NOT NULL,
    "projectType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "expectedEnd" DATETIME NOT NULL,
    "actualEnd" DATETIME,
    "budget" REAL,
    "teamMembers" TEXT NOT NULL,
    "milestones" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("createdAt", "description", "id", "startDate", "status", "updatedAt") SELECT "createdAt", "description", "id", "startDate", "status", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE INDEX "Project_startDate_idx" ON "Project"("startDate");
CREATE INDEX "Project_status_idx" ON "Project"("status");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "department" TEXT,
    "role" TEXT NOT NULL DEFAULT 'MEMBER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "id", "passwordHash", "role", "updatedAt") SELECT "createdAt", "email", "id", "passwordHash", "role", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_email_idx" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "ContentPost_publishDate_idx" ON "ContentPost"("publishDate");

-- CreateIndex
CREATE INDEX "ContentPost_status_idx" ON "ContentPost"("status");

-- CreateIndex
CREATE INDEX "DepartmentTask_deadline_idx" ON "DepartmentTask"("deadline");

-- CreateIndex
CREATE INDEX "DepartmentTask_status_idx" ON "DepartmentTask"("status");

-- CreateIndex
CREATE INDEX "EventTracking_eventDate_idx" ON "EventTracking"("eventDate");

-- CreateIndex
CREATE INDEX "EventTracking_status_idx" ON "EventTracking"("status");

-- CreateIndex
CREATE INDEX "DisciplineRecord_violationDate_idx" ON "DisciplineRecord"("violationDate");

-- CreateIndex
CREATE INDEX "CreativeTask_deliveryDate_idx" ON "CreativeTask"("deliveryDate");

-- CreateIndex
CREATE INDEX "CreativeTask_status_idx" ON "CreativeTask"("status");

-- CreateIndex
CREATE INDEX "EducationalContent_deadline_idx" ON "EducationalContent"("deadline");

-- CreateIndex
CREATE INDEX "EducationalContent_status_idx" ON "EducationalContent"("status");

-- CreateIndex
CREATE INDEX "Activity_startDate_idx" ON "Activity"("startDate");

-- CreateIndex
CREATE INDEX "Activity_status_idx" ON "Activity"("status");

-- CreateIndex
CREATE INDEX "Collaboration_deadline_idx" ON "Collaboration"("deadline");

-- CreateIndex
CREATE INDEX "Collaboration_status_idx" ON "Collaboration"("status");
