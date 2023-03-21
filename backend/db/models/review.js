'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      review.hasMany(models.ReviewImage, {foreignKey: 'reviewId', onDelete: 'CASCADE',  hooks: true })
      review.belongsTo(models.User, {foreignKey: 'userId'})
      review.belongsTo(models.Spot, {foreignKey: 'spotId'})
    }
  }
  review.init({
    review: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users"
      },
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Spots'
        }
      },

    }
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};
