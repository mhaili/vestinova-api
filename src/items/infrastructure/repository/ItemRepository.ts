import {IItemRepository} from "./IItemRepository";
import ItemEntity from "../entity/Item.entity";

export class ItemRepository implements IItemRepository {
    async createItem(item): Promise<ItemEntity[]> {
        await ItemEntity.create(item);
        return await ItemEntity.findAll();
    }
}