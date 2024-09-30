import {ItemModel} from "../../domain/model/item.model";
import ItemEntity from "../entity/Item.entity";

export interface IItemRepository {
    createItem(item: ItemModel): Promise<ItemEntity[]>;
}