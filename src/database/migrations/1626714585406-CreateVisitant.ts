import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateVisitant1626714585406 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'visitants',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'cpf',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'last_login',
                    type: 'timestamp',
                    isNullable: true
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ],
            foreignKeys: [
                {
                    name: 'FKUserVisitant',
                    columnNames: ['user_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'users',
                    onDelete: 'CASCADE',
                    onUpdate: 'SET NULL'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('visitants')
    }

}
