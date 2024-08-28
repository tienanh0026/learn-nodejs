import { QueryInterface, DataTypes } from 'sequelize'
;('use strict')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('schedule-message', {
      id: {
        field: 'id',
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      ownerId: {
        field: 'owner_id',
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      messageId: {
        field: 'message_id',
        type: Sequelize.UUID,
        allowNull: false
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
      content: {
        field: 'content',
        type: Sequelize.STRING,
        validate: {
          min: 1
        }
      },
      type: {
        type: Sequelize.ENUM('1', '2', '3'),
        allowNull: false,
        defaultValue: '1'
      },
      media: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: 'timestamp'
      },
      scheduleAt: {
        field: 'schedule_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('schedule-message')
  }
}
