-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'superuser');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'admin';
