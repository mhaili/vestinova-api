import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../../sequelize.config';

class UserEntity extends Model {
    public id!: string;
    public firstname!: string;
    public lastname!: string;
    public email!: string;
    public password!: string;
}

UserEntity.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'users',
    }
);

export default UserEntity;
