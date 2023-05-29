const { Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require ('../config/connection');

class Comment extends Model {}

Comment.init ({
    comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    comment_text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    date_created: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },

    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key:'id',
        }
    },

    post_id: {
        type: DataTypes.INTEGER,
        references: {    // Corrected here
            model: 'post',
            key:'post_id',
        }
    },

},
{
    sequelize,
    timestamps:false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
});

module.exports = Comment;