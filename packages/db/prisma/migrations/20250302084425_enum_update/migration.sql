/*
  Warnings:

  - The values [NativeAmerican,PacificIslander] on the enum `EthnicityEnum` will be removed. If these variants are still used in the database, this will fail.
  - The values [MAN,WOMAN,OTHER] on the enum `ModelTypeEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EthnicityEnum_new" AS ENUM ('Asian', 'Black', 'Hispanic', 'Indian', 'Middle_Eastern', 'Native_American', 'Pacific_Islander', 'White', 'Other');
ALTER TABLE "Model" ALTER COLUMN "ethnicity" TYPE "EthnicityEnum_new" USING ("ethnicity"::text::"EthnicityEnum_new");
ALTER TYPE "EthnicityEnum" RENAME TO "EthnicityEnum_old";
ALTER TYPE "EthnicityEnum_new" RENAME TO "EthnicityEnum";
DROP TYPE "EthnicityEnum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ModelTypeEnum_new" AS ENUM ('Man', 'Woman', 'Other');
ALTER TABLE "Model" ALTER COLUMN "type" TYPE "ModelTypeEnum_new" USING ("type"::text::"ModelTypeEnum_new");
ALTER TYPE "ModelTypeEnum" RENAME TO "ModelTypeEnum_old";
ALTER TYPE "ModelTypeEnum_new" RENAME TO "ModelTypeEnum";
DROP TYPE "ModelTypeEnum_old";
COMMIT;
