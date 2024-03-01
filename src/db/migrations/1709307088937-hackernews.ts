// import { MigrationInterface, QueryRunner } from "typeorm";

// export class Hackernews1709307088937 implements MigrationInterface {
//     name = 'Hackernews1709307088937'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`name\` \`name\` varchar(255) NULL`);
//         await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`karma\` \`karma\` int NULL`);
//         await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`about\` \`about\` text NULL`);
//         await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted\` \`deleted\` tinyint NULL`);
//         await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`dead\` \`dead\` tinyint NULL`);
//         await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` datetime NULL`);
//         await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL`);
//         await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_d7044ee71afa7fa721de0e3de76\``);
//         await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_cd31cf1f563a06aeeaab821bd1c\``);
//         await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`text\` \`text\` text NULL`);
//         await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`parent_comment_id\` \`parent_comment_id\` int NULL`);
//         await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`entityId\` \`entityId\` int NULL`);
//         await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`createdById\` \`createdById\` int NULL`);
//         await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`created_at\` \`created_at\` datetime NULL`);
//         await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL`);
//         await queryRunner.query(`ALTER TABLE \`stories\` CHANGE \`title\` \`title\` varchar(255) NULL`);
//         await queryRunner.query(`ALTER TABLE \`stories\` CHANGE \`text\` \`text\` text NULL`);
//         await queryRunner.query(`ALTER TABLE \`stories\` CHANGE \`score\` \`score\` int NULL`);
//         await queryRunner.query(`ALTER TABLE \`stories\` CHANGE \`descendant_count\` \`descendant_count\` int NULL`);
//         await queryRunner.query(`ALTER TABLE \`stories\` CHANGE \`dead\` \`dead\` tinyint NULL`);
//         await queryRunner.query(`ALTER TABLE \`stories\` CHANGE \`created_at\` \`created_at\` datetime NULL`);
//         await queryRunner.query(`ALTER TABLE \`stories\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL`);
//         await queryRunner.query(`ALTER TABLE \`job\` DROP FOREIGN KEY \`FK_228b150b2333ecd5dbf4f7fc1fa\``);
//         await queryRunner.query(`ALTER TABLE \`job\` CHANGE \`createdById\` \`createdById\` int NULL`);
//         await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_cd31cf1f563a06aeeaab821bd1c\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_d7044ee71afa7fa721de0e3de76\` FOREIGN KEY (\`entityId\`) REFERENCES \`stories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`job\` ADD CONSTRAINT \`FK_228b150b2333ecd5dbf4f7fc1fa\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE \`job\` DROP FOREIGN KEY \`FK_228b150b2333ecd5dbf4f7fc1fa\``);
//         await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_d7044ee71afa7fa721de0e3de76\``);
//         await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_cd31cf1f563a06aeeaab821bd1c\``);
//         await queryRunner.query(`ALTER TABLE \`job\` CHANGE \`createdById\` \`createdById\` int NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`job\` ADD CONSTRAINT \`FK_228b150b2333ecd5dbf4f7fc1fa\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`stories\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`stories\` CHANGE \`created_at\` \`created_at\` datetime NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`stories\` CHANGE \`dead\` \`dead\` tinyint NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`stories\` CHANGE \`descendant_count\` \`descendant_count\` int NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`stories\` CHANGE \`score\` \`score\` int NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`stories\` CHANGE \`text\` \`text\` text NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`stories\` CHANGE \`title\` \`title\` varchar(255) NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`created_at\` \`created_at\` datetime NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`createdById\` \`createdById\` int NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`entityId\` \`entityId\` int NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`parent_comment_id\` \`parent_comment_id\` int NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`text\` \`text\` text NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_cd31cf1f563a06aeeaab821bd1c\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_d7044ee71afa7fa721de0e3de76\` FOREIGN KEY (\`entityId\`) REFERENCES \`stories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` datetime NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` datetime NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`dead\` \`dead\` tinyint NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted\` \`deleted\` tinyint NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`about\` \`about\` text NOT NULL`);
//         await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`karma\` \`karma\` int NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
//     }

// }
