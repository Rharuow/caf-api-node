import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAccess1626714758986 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'access',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'alphanumeric',
                    type: 'varchar'
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                },
                {
                    name: 'checkin',
                    type: 'timestamp',
                    isNullable: true
                },
                {
                    name: 'checkout',
                    type: 'timestamp',
                    isNullable: true
                },
                {
                    name: 'is_active',
                    type: 'boolean',
                    default: true
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
                    columnNames: ['user_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'users'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
