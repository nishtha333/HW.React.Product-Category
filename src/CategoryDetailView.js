import React from 'react'
import ProductRow from './ProductRow'

const CategoryDetailView = function({category}) {
    const {name, products} = category

    return (
        <div>{name}
            <div id="products">
                {products.map(product => <ProductRow key={product.id} product={product} />)}
            </div>
        </div>

    )
}

export default CategoryDetailView