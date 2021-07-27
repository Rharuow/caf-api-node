import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterConstrainPasswordUser1626961638558
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "users",
      "password",
      new TableColumn({ name: "password", type: "varchar", isNullable: true })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "users",
      "password",
      new TableColumn({ name: "password", type: "varchar", isNullable: true })
    );
  }
}
