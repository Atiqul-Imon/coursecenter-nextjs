/*
  Warnings:

  - You are about to drop the column `intakeMonth` on the `applicants` table. All the data in the column will be lost.
  - You are about to drop the column `intakeYear` on the `applicants` table. All the data in the column will be lost.
  - You are about to drop the column `personalStatement` on the `applicants` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "applicants" DROP CONSTRAINT "applicants_courseId_fkey";

-- AlterTable
ALTER TABLE "applicants" DROP COLUMN "intakeMonth",
DROP COLUMN "intakeYear",
DROP COLUMN "personalStatement",
ADD COLUMN     "marketingConsent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "preferredCourse" TEXT,
ADD COLUMN     "preferredUniversity" TEXT,
ADD COLUMN     "privacyConsent" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "courseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "applicants" ADD CONSTRAINT "applicants_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
