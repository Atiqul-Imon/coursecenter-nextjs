-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_universityId_fkey";

-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "universityId" DROP NOT NULL,
ALTER COLUMN "tuitionFee" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "universities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
