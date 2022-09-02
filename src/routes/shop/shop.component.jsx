import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { CategoriesPreview } from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { setCategories } from '../../store/categories/category.action'

export const Shop = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryArray = await getCategoriesAndDocuments()
            dispatch(setCategories(categoryArray))
        }
        getCategoriesMap()
    }, [])

    return <Routes>
        <Route index element={<CategoriesPreview />} />
        <Route path=':category' element={<Category />} />
    </Routes>
}