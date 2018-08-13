const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL, {logging: false});

const Category = db.define('category', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Category.hasMany(Product);
Product.belongsTo(Category);

const sync = () => {
    return db.sync({force: true});
};

const seed = async () => {
    const [beverage, cannedGoods, condiments, paperGoods] = await Promise.all([
                                                                                Category.create({name: 'Beverage'}),
                                                                                Category.create({name: 'Canned Goods'}),
                                                                                Category.create({name: 'Condiments'}),
                                                                                Category.create({name: 'Paper Goods'}),
                                                                            ]);
    const [beer, soda, juice, milk, cannedTomatoes, ketchup] = await Promise.all([
                                                                                Product.create({name: 'Beer'}),
                                                                                Product.create({name: 'Soda'}),
                                                                                Product.create({name: 'Juice'}),
                                                                                Product.create({name: 'Milk'}),
                                                                                Product.create({name: 'Canned Tomatoes'}),
                                                                                Product.create({name: 'Ketchup'}),
                                                                            ]);
    await beverage.setProducts([beer, soda]);
    await beverage.addProducts([juice, milk]);
    await cannedGoods.setProducts([cannedTomatoes]);
    await ketchup.setCategory(condiments);
};

const getAllCategories = () => {
    return Category.findAll({
        include: [Product]
    });
};

const getCategoryById = (id) => {
    return Category.findOne({
        where: {id: id},
        include: [Product]
    });
};

module.exports = {
    seed,
    sync,
    getAllCategories,
    getCategoryById,
    Models: {
        Category,
        Product
    }
}