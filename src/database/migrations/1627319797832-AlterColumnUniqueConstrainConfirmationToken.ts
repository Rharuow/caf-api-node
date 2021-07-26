import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterColumnUniqueConstrainConfirmationToken1627319797832 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('users', 'confirmation_token', new TableColumn(
            {
                name: 'confirmation_token',
                type: 'varchar',
                isUnique: true
            }
        ))
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('users', 'confirmation_token', new TableColumn({
            name: 'confirmation_token',
            type: 'varchar'
        }))
    }
}
