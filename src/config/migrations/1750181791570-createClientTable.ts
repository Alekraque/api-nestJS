import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClientTable1750181791570 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
        name: "clients",
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },

          {
              name: 'user_id',
              type: 'uuid',
              isNullable: false
          },

          {
            name:"name",
            type: 'varchar',
            length: '255',
            isNullable: false
          },


          {
            name: "email",
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false
          },

          {
             name: "telefone",
             type: "varchar",
             length: "50",
             isNullable: false
          },

          {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
          isNullable: false,
        },

          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],

        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE'
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('clients')
    }

}
