import { QueryInterface, DataTypes } from 'sequelize'
;('use strict')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('subscription', {
      id: {
        field: 'id',
        allowNull: false,
        type: Sequelize.UUID,
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
      roomId: {
        field: 'room_id',
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        references: {
          model: 'room',
          key: 'id'
        }
      },
      endpoint: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      key: {
        type: Sequelize.JSON,
        allowNull: false
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: 'timestamp'
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: 'timestamp'
      },
      deletedAt: {
        field: 'deleted_at',
        allowNull: true,
        type: 'timestamp'
      }
    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('subscription')
  }
}
