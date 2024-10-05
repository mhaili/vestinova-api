import {ItemRepository} from "../../infrastructure/repository/ItemRepository";
import ItemEntity from "../../infrastructure/entity/Item.entity";

export class SearchItemsUseCase {
    private readonly itemRepository: ItemRepository;
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    public async searchItems(query: string): Promise<ItemEntity[] | Error> {
        try {
            return await this.itemRepository.searchItems(query);
        }
        catch (error) {
            return new Error(error.message);
        }
    }
}