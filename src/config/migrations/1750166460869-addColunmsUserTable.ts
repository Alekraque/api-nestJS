import { Column, MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddColunmsUserTable1750166460869 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'telefone',
        type: 'varchar',
        length: '50',
        default: '11233',
      }),
    )
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'role',
        type: 'varchar',
        length: '50',
        default: '0',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'telefone')
    await queryRunner.dropColumn('users', 'role')
  }
}
