import {ItemModel} from "../model/item.model";
import ItemEntity from "../../infrastructure/entity/Item.entity";
import {ImageStorageService} from "../../../shared/service/imageStorage.service";

export class CreateItemService {
    private readonly itemRepository;
    private readonly imageStorageService: ImageStorageService;
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
        this.imageStorageService = new ImageStorageService();
    }
    public async execute(item: ItemModel, images: File[]): Promise<ItemEntity[] | Error> {
        try {
            const newItem = new ItemModel();
            const nameError = newItem.setName(item.name);
            const imageIds = await Promise.all(images.map(image => this.imageStorageService.uploadImage(image)));
            newItem.setImagesIds(imageIds);
            console.log("============================")
            console.log(newItem);
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
            return await this.itemRepository.createItem(newItem);
        } catch (error) {
            return new Error(error);
        }
    }
}