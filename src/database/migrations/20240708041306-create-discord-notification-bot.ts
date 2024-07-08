import { QueryInterface, DataTypes } from 'sequelize'
;('use strict')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('discord-notification-bot', {
      id: {
        field: 'id',
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      guildId: {
        field: 'guild_id',
        allowNull: false,
        type: Sequelize.UUID
      },
      channelId: {
        field: 'channel_id',
        allowNull: false,
        type: Sequelize.UUID
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
    await queryInterface.dropTable('discord-notification-bot')
  }
}
