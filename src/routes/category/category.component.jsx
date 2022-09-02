import React, { useEffect, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/product-card.component'
import Spinner from '../../components/spinner/spinner.component'
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector'
import './category.styles.jsx'
import { CategoryContainer, CategoryTitle } from './category.styles.jsx'

export default function Category() {
    const { category } = useParams()
    const categories = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)
    const [products, setProducts] = useState(categories[category])

    useEffect(() => {
        setProducts(categories[category])
    }, [categories, category])

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            {
                isLoading ? <Spinner /> :
                    <CategoryContainer>
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                    </CategoryContainer>
            }
        </Fragment>
    )
}
