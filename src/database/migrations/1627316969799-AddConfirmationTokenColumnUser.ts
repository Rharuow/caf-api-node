import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export class AddConfirmationTokenColumnUser1627316969799 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'confirmation_token',
            type: 'varchar'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'confirmation_token')
    }
}