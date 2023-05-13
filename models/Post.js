
const {Model, DataTypes } = require("sequelize");
// we can inform where to create the table
const sequelize = require("../config/connection");

class Post extends Model {};

    Post.init({
        // title.content,creator_username, created_on
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        title: {
            type:DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type:DataTypes.TEXT,
            allowNull: false,
        },

        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        user_id: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'user',
                key:'id',
            }
        }
    },
    {
        sequelize,
        timestamps:false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    });

module.exports = Post;