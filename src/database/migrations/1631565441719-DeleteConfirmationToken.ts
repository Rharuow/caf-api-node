import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class DeleteConfirmationToken1631565441719 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('users', 'confirmation_token')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        "users",
        new TableColumn({
          name: "confirmation_token",
          type: "varchar",
        })
      );
    }

}
