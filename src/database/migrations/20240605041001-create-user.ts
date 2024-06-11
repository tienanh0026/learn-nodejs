import { QueryInterface, DataTypes } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('user', {
      id: {
        field: 'id',
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        field: 'name',
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          min: 2,
          max: 50
        }
      },
      email: {
        field: 'email',
        type: Sequelize.STRING(60),
        validate: {
          isEmail: true
        },
        unique: true
      },
      password: {
        field: 'password',
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
          min: 6
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
        // defaultValue: database.fn('NOW'),
        allowNull: false
      }
    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('user')
  }
}
