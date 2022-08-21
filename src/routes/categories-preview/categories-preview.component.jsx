import React, { useContext, Fragment } from 'react'
import { CategoriesContext } from '../../contexts/categories.context'
import CategoryPreview from '../../components/category-preview/category-preview.component';

export const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext)
    return <Fragment>
        {Object.keys(categoriesMap).map((title) => {
            const products = categoriesMap[title]
            return <CategoryPreview
                title={title}
                products={products}
            />
        })}
    </Fragment>
}