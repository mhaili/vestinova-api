import {IItemRepository} from "./IItemRepository";
import ItemEntity from "../entity/Item.entity";
import CategoryEntity from "../entity/Category.entity";
import { Op } from 'sequelize';

export class ItemRepository implements IItemRepository {
    async createItem(item): Promise<ItemEntity[]> {
        const newItem = await ItemEntity.create(item);
        if (item.categoryIds && item.categoryIds.length > 0) {
            const categories = await CategoryEntity.findAll({
                where: {
                    id: item.categoryIds
                }
            });
           for (const category of categories) {
               await newItem.addCategoryEntity(category)
           }
        }
        return await ItemEntity.findAll(
            {
                include: CategoryEntity
            }
        );
    }
    async deleteItem(id): Promise<void> {
        await ItemEntity.destroy({where: {id}});
    }
    async findItemById(id): Promise<ItemEntity | null> {
        return await ItemEntity.findByPk(id);
    }
    async findAllItems(pagination): Promise<ItemEntity[]> {
        return await ItemEntity.findAll(
            {
                limit: pagination,
                include: {
                    model: CategoryEntity,
                    attributes: ['isParent', 'name', "parentId"]
                }
            }
        );
    }

    async updateItem(id: string, item: ItemEntity): Promise<ItemEntity | null> {
        await ItemEntity.update(item, {where: {id}});
        return await ItemEntity.findByPk(id);
    }

    async getCategories(): Promise<CategoryEntity[]> {
        return await CategoryEntity.findAll();
    }

    async searchItems(search: string): Promise<ItemEntity[]> {
        const searchParams = new URLSearchParams(search);
        const brand = searchParams.get('brand');
        const size = searchParams.get('size');
        const color = searchParams.get('color');
        const sexe = searchParams.get('sexe');
        const priceRange = searchParams.get('priceRange');

        const whereClause = {};
        if (brand) whereClause['brand'] = brand;
        if (size) whereClause['size'] = size;
        if (color) whereClause['color'] = color;
        if (sexe) whereClause['sexe'] = sexe;
        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split('-');
            whereClause['price'] = { [Op.between]: [minPrice, maxPrice] };
        }

        return await ItemEntity.findAll({
            where: whereClause,
            include: {
                model: CategoryEntity,
                attributes: ['isParent', 'name']
            }
        });
    }
}