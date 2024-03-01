// import { MigrationInterface, QueryRunner } from "typeorm";

// export class Hackernews1709314362137 implements MigrationInterface {
//     name = 'Hackernews1709314362137'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`CREATE TABLE \`authors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`karma\` int NULL, \`about\` text NULL, \`deleted\` tinyint NULL, \`dead\` tinyint NULL, \`created_at\` datetime NULL, \`deleted_at\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
//         await queryRunner.query(`CREATE TABLE \`stories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`external_id\` int NOT NULL, \`title\` varchar(255) NULL, \`text\` text NULL, \`score\` int NULL, \`descendant_count\` int NULL, \`dead\` tinyint NULL, \`createdById\` int NOT NULL, \`created_at\` datetime NULL, \`deleted_at\` datetime NULL, UNIQUE INDEX \`IDX_ab60458941aa8713720ef2f5c7\` (\`external_id\`), UNIQUE INDEX \`REL_5bba9a5881536331e952bcf3ec\` (\`createdById\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
//         await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`external_id\` int NOT NULL, \`text\` text NULL, \`parent_comment_id\` int NULL, \`entityId\` int NULL, \`createdById\` int NULL, \`created_at\` datetime NULL, \`deleted_at\` datetime NULL, UNIQUE INDEX \`IDX_8305e5e6b0f6d7200c214f71d6\` (\`external_id\`), UNIQUE INDEX \`REL_cd31cf1f563a06aeeaab821bd1\` (\`createdById\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
//         await queryRunner.query(`ALTER TABLE \`stories\` ADD CONSTRAINT \`FK_5bba9a5881536331e952bcf3ec1\` FOREIGN KEY (\`createdById\`) REFERENCES \`authors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_cd31cf1f563a06aeeaab821bd1c\` FOREIGN KEY (\`createdById\`) REFERENCES \`authors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_d7044ee71afa7fa721de0e3de76\` FOREIGN KEY (\`entityId\`) REFERENCES \`stories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_d7044ee71afa7fa721de0e3de76\``);
//         await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_cd31cf1f563a06aeeaab821bd1c\``);
//         await queryRunner.query(`ALTER TABLE \`stories\` DROP FOREIGN KEY \`FK_5bba9a5881536331e952bcf3ec1\``);
//         await queryRunner.query(`DROP INDEX \`REL_cd31cf1f563a06aeeaab821bd1\` ON \`comments\``);
//         await queryRunner.query(`DROP INDEX \`IDX_8305e5e6b0f6d7200c214f71d6\` ON \`comments\``);
//         await queryRunner.query(`DROP TABLE \`comments\``);
//         await queryRunner.query(`DROP INDEX \`REL_5bba9a5881536331e952bcf3ec\` ON \`stories\``);
//         await queryRunner.query(`DROP INDEX \`IDX_ab60458941aa8713720ef2f5c7\` ON \`stories\``);
//         await queryRunner.query(`DROP TABLE \`stories\``);
//         await queryRunner.query(`DROP TABLE \`authors\``);
//     }

// }
