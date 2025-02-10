import { QueryInterface, DataTypes } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('otp', {
      id: {
        field: 'id',
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        field: 'user_id',
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      otp: {
        field: 'otp',
        type: Sequelize.STRING,
        allowNull: false
      },
      expiresAt: {
        field: 'expires_at',
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        field: 'created_at',
        type: 'timestamp',
        allowNull: false
      },
      updatedAt: {
        field: 'updated_at',
        type: 'timestamp',
        allowNull: false
      }
    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('otp')
  }
}
