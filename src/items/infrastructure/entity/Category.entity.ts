import {DataTypes, Model} from "sequelize";
import sequelize from "../../../../sequelize.config";

class CategoryEntity extends Model {
    public id!: number;
    public name!: string;
    public isParent!: boolean;
    public parentId?: string;
}

CategoryEntity.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        isParent: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'categories',
    }
)
export default CategoryEntity;