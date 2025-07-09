const chalk = require('chalk');

const {Model, DataTypes} = require('sequelize');
const ErrorMsg = require('../error-msg.cjs');
const multer = require('multer');
const fs = require('fs').promises;

class StorageFile extends Model
{


    static #AddToDB(filename, path, mimetype, bytes)
    {
        return new Promise(async (resolve, reject) => {
            fs.
        });
    }
}


function StorageFileInit(sequelize)
{
    StorageFile.init(
        {
            filename: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
            },
            path: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isRelativePath(value) {
                        if(!value.match(/([/](.*)+)+/))
                        {
                            throw new Error("thumbnail URL must be relative");
                        }
                    },
                }
            },
            mimetype: {
                type: DataTypes.STRING,
                allowNull: false
            },
            bytes: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: `${StorageFile.name}`,
        }
    );
}