import React from 'react'
import axios from 'axios'
import CategoriesListView from './CategoriesListView'
import CategoryDetailView from './CategoryDetailView'

class Main extends React.Component {

    /*Main can be sent props too
    To use in the constructor; use the following:
    constructor(props) {
        super()
        console.log(props)
    }
    or can do this:
    constructor(props) {
        super(props)
        console.log(this.props)
    }
    Regardless of above options, it can be accessed in render as this.props
    */
    constructor() {
        super()
        this.state = {
            categories: [],
            category: {}
        }
        this.selectCategory = this.selectCategory.bind(this)
    }

    selectCategory(id) {
        if(id === -1) {
            this.setState({
                category: {}
            })
            return
        }
        axios.get(`/api/categories/${id}`)
             .then(response => {
                 this.setState({
                     category: response.data
                 })
             })
    }

    componentDidMount() {
        axios.get('/api/categories')
             .then(response => {
                 this.setState({
                     categories: response.data
                 })
             })
    }

    render() {
        const {categories, category} = this.state
        const {selectCategory} = this

        return (
            <div>
                <h1>Acme Products and Categories - React!</h1>

                {/* To display JSON in React before building components, can do following:
                    <div>
                        <pre>
                            {JSON.stringify(categories, null, 2)}
                        </pre>
                    </div>*/}

                {
                    category.id ? <CategoryDetailView category={category} />
                                : <CategoriesListView categories={categories} selectCategory={selectCategory}/>
                }

                <hr />
                <a href="/" onClick={() => selectCategory(-1)}>Back </a>
            </div>
        )
    }
}

export default Main