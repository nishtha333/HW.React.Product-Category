import React from 'react'
import CategoriesListViewRow from './CategoriesListViewRow'

const CategoriesListView = function({categories, selectCategory}) {
    return (
        <div id="categories">
            {categories.map(category => <CategoriesListViewRow key={category.id} 
                                                               category={category} selectCategory={selectCategory}/>)}
        </div>

    )
}

export default CategoriesListView