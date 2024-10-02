import {ItemRepository} from "../../infrastructure/repository/ItemRepository";
import ItemEntity from "../../infrastructure/entity/Item.entity";
import {CreateItemService} from "../../domain/use-case/create-item.service";
import {isCreateItemDto} from "../dto/createItem.dto";
import {DeleteItemService} from "../../domain/use-case/delete-item.service";
import {FindItemByIdService} from "../../domain/use-case/find-item-by-id.service";
import {GetItemsService} from "../../domain/use-case/get-items.service";
import {UpdateItemService} from "../../domain/use-case/update-item.service";

export class ItemController {
    private readonly itemRepository: ItemRepository;
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
        this.createItem = this.createItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.findItemById = this.findItemById.bind(this);
        this.getItems = this.getItems.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }
    public async createItem(req, res): Promise<ItemEntity[] | Error> {
        const item = JSON.parse(req.body.json);
        const images = req.files;
        if (!isCreateItemDto(item)) return res.status(400).json({ item: item });
        try {
            const createdItem = await new CreateItemService(this.itemRepository).execute(item, images);
            console.log(createdItem)
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

    public async getItems(req, res): Promise<ItemEntity[] | Error> {
        const pagination = req.query.pagination;
        if (!pagination) return res.status(400).json({ error: 'Pagination is required' });
        try {
            const items = await new GetItemsService(this.itemRepository).getItems(pagination);
            res.status(200).json(items);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public async updateItem(req, res): Promise<ItemEntity | Error> {
        const itemId = req.params.id;
        const item = req.body;
        try {
            const updatedItem = await new UpdateItemService(this.itemRepository).updateItem(itemId, item);
            if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
            res.status(200).json(updatedItem);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}