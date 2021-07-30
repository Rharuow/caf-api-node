import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnRoleToUser1627650386509 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "role",
        type: "enum",
        enum: ["visitant", "employee"],
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "role");
  }
}
