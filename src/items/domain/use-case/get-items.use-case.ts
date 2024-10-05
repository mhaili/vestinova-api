import {IItemRepository} from "../../infrastructure/repository/IItemRepository";
import ItemEntity from "../../infrastructure/entity/Item.entity";

export class GetItemsUseCase {
    private readonly itemRepository: IItemRepository;
    constructor(itemRepository: IItemRepository) {
        this.itemRepository = itemRepository;
    }
    public async getItems(pagination: number): Promise<ItemEntity[] | Error> {
        try {
            return await this.itemRepository.findAllItems(pagination);
        } catch (error) {
            return new Error(error.message);
        }
    }
}