const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL, {logging: false});

/*
Each model should be defined in its own file
index file should have conn and require for each model; and does sync/seed
When there is inter-dependency between models - like in associations
ex: Product.findAll({include:[Category]})
Do not require another model, but get it from conn object
Product.findAll({include:[db.models.category]})
"category" is the name that you use when defining the model - that is what sequelize will call and attach to db.models
*/

const Category = db.define('category', {

    //Can store an array
    things: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,

        /* Getter/ Setter : Massaging the data on the way out/ way in (using this.getDataValue and this.setDataValue */
        get: function() {
            return this.getDataValue('name').toUpperCase();
        },
        /* Constraints/ Validations: */
        unique: true,
        defaultValue: 'category',
        validate: {
            notEmpty: true
        }
        
    }
}, { // Hooks Example
    hooks: {
        beforeUpdate: function(category) {
            category.name = category.name.toUpperCase();
        }

    }
});

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Category.hasMany(Product);
Product.belongsTo(Category); //Alias: Product.belogsTo(Category, {as: 'cat'});

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
    //Could do await Promise.all([beverage.setProducts([beer, soda]), beverage.addProducts([juice, milk]])
    await beverage.setProducts([beer, soda]);
    await beverage.addProducts([juice, milk]);
    await cannedGoods.setProducts([cannedTomatoes]);
    await ketchup.setCategory(condiments); //If alias: ketchup.setCat(condiments);
};

const getAllCategories = () => {
    return Category.findAll({
        include: [Product]
    });
};

const getCategoryById = (id) => {
    //Can do the following (if looking for id)
    //return Category.findById(id);
    return Category.findOne({
        where: {id: id},
        include: [Product]
    });
};

//If using "alias"; need to specify 'as' in findAll
//When returning a promise; ensure you 'return' it
//const Product.getAllWithCategory = () => ...

//Go over Instance methods (usage of this and no =>)
Category.prototype.exclaim = function () {
    this.name = `${this.name}!!!!`;
    /*This wont be saved unless following is called
    return this.save()
    If the above is not called, the object has changed, but not the database.
    So, the test might have !!!!! to be passed; but the routes shouldnt change - and should get the data from the database
    (without the !!!!)
    */
}


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