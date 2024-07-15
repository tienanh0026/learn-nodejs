import { QueryInterface, DataTypes } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('room-user', {
      id: {
        field: 'id',
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      role: {
        field: 'role',
        type: Sequelize.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
      },
      userId: {
        field: 'user_id',
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      roomId: {
        field: 'room_id',
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'room',
          key: 'id'
        }
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
    await queryInterface.dropTable('room-user')
  }
}
