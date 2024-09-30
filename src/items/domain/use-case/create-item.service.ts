import {ItemModel} from "../model/item.model";
import ItemEntity from "../../infrastructure/entity/Item.entity";

export class CreateItemService {
    private readonly itemRepository;
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    public async execute(item: ItemModel): Promise<ItemEntity[] | Error> {
        try {
            const newItem = new ItemModel();
            const nameError = newItem.setName(item.name);
            if (nameError instanceof Error) {
                return nameError;
            }
            const descriptionError = newItem.setDescription(item.description);
            if (descriptionError instanceof Error) {
                return descriptionError;
            }
            const priceError = newItem.setPrice(Number(item.price));
            if (priceError instanceof Error) {
                return priceError;
            }
            const userIdError = newItem.setUserId(item.userId);
            if (userIdError instanceof Error) {
                return userIdError;
            }
            return await this.itemRepository.createItem(item);
        } catch (error) {
            return new Error(error);
        }
    }
}