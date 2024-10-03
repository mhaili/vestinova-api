import sequelize from "./sequelize.config";
import CategoryEntity from "./src/items/infrastructure/entity/Category.entity";

const defaultCategories = [
    { id: 1, name: "Type", isParent: true },
    { id: 2, name: "Color", isParent: true },
    { id: 3, name: "Size", isParent: true },
    { id: 4, name: "Brand", isParent: true },

    { id: 5, name: "Shirt", isParent: false, parentId: 1 },
    { id: 6, name: "Pants", isParent: false, parentId: 1 },
    { id: 7, name: "Shoes", isParent: false, parentId: 1 },
    { id: 8, name: "Hat", isParent: false, parentId: 1 },
    { id: 9, name: "Gloves", isParent: false, parentId: 1 },

    { id: 10, name: "Red", isParent: false, parentId: 2 },
    { id: 11, name: "Blue", isParent: false, parentId: 2 },
    { id: 12, name: "Green", isParent: false, parentId: 2 },
    { id: 13, name: "Yellow", isParent: false, parentId: 2 },
    { id: 14, name: "Black", isParent: false, parentId: 2 },
    { id: 15, name: "White", isParent: false, parentId: 2 },

    { id: 16, name: "S", isParent: false, parentId: 3 },
    { id: 17, name: "M", isParent: false, parentId: 3 },
    { id: 18, name: "L", isParent: false, parentId: 3 },
    { id: 19, name: "XL", isParent: false, parentId: 3 },

    { id: 20, name: "Nike", isParent: false, parentId: 4 },
    { id: 21, name: "Adidas", isParent: false, parentId: 4 },
    { id: 22, name: "Puma", isParent: false, parentId: 4 },
    { id: 23, name: "Reebok", isParent: false, parentId: 4 },
    { id: 24, name: "Under Armour", isParent: false, parentId: 4 },
    { id: 25, name: "New Balance", isParent: false, parentId: 4 },
    { id: 26, name: "Converse", isParent: false, parentId: 4 },
    { id: 27, name: "Vans", isParent: false, parentId: 4 },
];

async function seedCategories() {
    try {
        await sequelize.sync();
        await CategoryEntity.bulkCreate(defaultCategories);
        console.log('Categories seeded successfully');
    } catch (error) {
        console.error('Error seeding categories:', error);
    }
}

export default seedCategories;