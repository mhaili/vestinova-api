import {ItemRepository} from "../../infrastructure/repository/ItemRepository";

export class FindItemByIdService {
    private readonly itemRepository: ItemRepository;
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async findItemById(itemId) {
        try {
            return await this.itemRepository.findItemById(itemId);
        } catch (error) {
            return new Error("Error finding item");
        }
    }
}