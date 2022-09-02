import React, { Fragment } from 'react'
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';
import Spinner from '../../components/spinner/spinner.component';

export const CategoriesPreview = () => {
    const categories = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)
    return <Fragment>
        {isLoading ? <Spinner /> : Object.keys(categories).map((title) => {
            const products = categories[title]
            return <CategoryPreview
                title={title}
                products={products}
            />
        })}
    </Fragment>
}