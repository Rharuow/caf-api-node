import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTempUser1631385700418 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({name: 'TempUser', columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true
        },
        {
          name: 'username',
          type: 'varchar',
        },
        {
          name: 'cpf',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'registration',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'email',
          type: 'varchar',
        },
        {
          name: 'avatar',
          type: 'varchar',
        },
        {
          name: "role",
          type: "enum",
          enum: ["visitant", "employee"],
        },
        {
          name: "confirmation_token",
          type: "varchar",
          isUnique: true,
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()",
        },
        {
          name: "updated_at",
          type: "timestamp",
          default: "now()",
        }
      ]}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('TempUser')
    }

}
