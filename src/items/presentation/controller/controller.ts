import {ItemRepository} from "../../infrastructure/repository/ItemRepository";
import ItemEntity from "../../infrastructure/entity/Item.entity";
import {CreateItemService} from "../../domain/use-case/create-item.service";
import {isCreateItemDto} from "../dto/createItem.dto";
import {DeleteItemService} from "../../domain/use-case/delete-item.service";
import {FindItemByIdService} from "../../domain/use-case/find-item-by-id.service";

export class ItemController {
    private readonly itemRepository: ItemRepository;
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
        this.createItem = this.createItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.findItemById = this.findItemById.bind(this)
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

    public async deleteItem(req, res): Promise<ItemEntity[] | Error> {
        const itemId = req.params.id;
        const userId = req.user.id;
        try {
            await new DeleteItemService(this.itemRepository).deleteItem(userId, itemId);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public async findItemById(req, res): Promise<ItemEntity | Error> {
        const itemId = req.params.id;
        try {
            const item = await new FindItemByIdService(this.itemRepository).findItemById(itemId);
            if (!item) return res.status(404).json({ error: 'Item not found' });
            res.status(200).json(item);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}