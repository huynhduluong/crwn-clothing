import React, { useEffect, useState, Fragment } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CategoriesContext } from '../../contexts/categories.context'
import ProductCard from '../../components/product-card/product-card.component'
import './category.styles.scss'

export default function Category() {
    const { category } = useParams()
    const { categoriesMap } = useContext(CategoriesContext)
    const [products, setProducts] = useState(categoriesMap[category])

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [categoriesMap, category])


    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
        </Fragment>
    )
}
