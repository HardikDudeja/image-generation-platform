-- AlterEnum
ALTER TYPE "EyeColorEnum" ADD VALUE 'Black';

-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT 'default-user-id';
