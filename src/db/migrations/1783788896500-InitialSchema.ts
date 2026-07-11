import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1783788896500 implements MigrationInterface {
    name = 'InitialSchema1783788896500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."booking_status_enum" AS ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed')`);
        await queryRunner.query(`CREATE TABLE "booking" ("id" SERIAL NOT NULL, "customerName" character varying NOT NULL, "customerEmail" character varying NOT NULL, "customerPhone" character varying NOT NULL, "bookingDate" date NOT NULL, "bookingTime" TIME NOT NULL, "notes" text, "status" "public"."booking_status_enum" NOT NULL DEFAULT 'Pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "serviceId" integer, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "duration" integer NOT NULL, "price" double precision NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_e812cafb996fae4e9636ffe294f" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_e812cafb996fae4e9636ffe294f"`);
        await queryRunner.query(`DROP TABLE "service"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TYPE "public"."booking_status_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
