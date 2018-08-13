const expect = require('chai').expect;
const db = require('../db');
const {Category, Product} = db.Models;

describe('DB Models', () => {
    beforeEach(() => {
        return db.sync()
                 .then(()=> db.seed());
    });

    it('There are 4 categories', () => {
        return db.getAllCategories()
                 .then(categories => {
                     expect(categories.length).to.equal(4);
                 })
    });
    it('Beverage category has 4 products', () => {
        return Category.findOne({ where: {name: 'Beverage'}, include: [Product]})
                       .then(beverage => {
                           expect(beverage.products.length).to.equal(4);
                       })
    });
});