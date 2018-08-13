import React from 'react'

const CategoriesListViewRow = function({category, selectCategory}) {
    return (
        <li onClick={() => selectCategory(category.id)}>{category.name}  {category.products.length} </li>
    )
}

export default CategoriesListViewRow