import {IItemRepository} from "./IItemRepository";
import ItemEntity from "../entity/Item.entity";

export class ItemRepository implements IItemRepository {
    async createItem(item): Promise<ItemEntity[]> {
        await ItemEntity.create(item);
        return await ItemEntity.findAll();
    }
    async deleteItem(id): Promise<void> {
        await ItemEntity.destroy({where: {id}});
    }
    async findItemById(id): Promise<ItemEntity | null> {
        return await ItemEntity.findByPk(id);
    }
    async findAllItems(pagination): Promise<ItemEntity[]> {
        return await ItemEntity.findAll({limit: pagination});
    }
}