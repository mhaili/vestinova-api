import ItemEntity from "../../infrastructure/entity/Item.entity";

export class UpdateItemUseCase {
    private readonly itemRepository;
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    public async updateItem(id, item): Promise<ItemEntity | Error> {
        try {
            return await this.itemRepository.updateItem(id, item);
        }
        catch (error) {
            return new Error(error.message);
        }
    }
}