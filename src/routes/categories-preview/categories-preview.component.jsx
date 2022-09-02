import React, { Fragment } from 'react'
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector';

export const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap)
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