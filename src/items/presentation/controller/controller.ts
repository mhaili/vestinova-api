import {ItemRepository} from "../../infrastructure/repository/ItemRepository";
import ItemEntity from "../../infrastructure/entity/Item.entity";
import {CreateItemService} from "../../domain/use-case/create-item.service";
import {isCreateItemDto} from "../dto/createItem.dto";

export class ItemController {
    private readonly itemRepository: ItemRepository;
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
        this.createItem = this.createItem.bind(this);
    }
    public async createItem(req, res): Promise<ItemEntity[] | Error> {
        const item = req.body;
        if (!isCreateItemDto(item)) return res.status(400).json({ error: 'Invalid body' });
        try {
            const createdItem = await new CreateItemService(this.itemRepository).execute(item);
            res.status(201).json(createdItem);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}