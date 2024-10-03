import {IItemRepository} from "./IItemRepository";
import ItemEntity from "../entity/Item.entity";
import CategoryEntity from "../entity/Category.entity";

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
                include: CategoryEntity
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
}