import React, { useContext } from 'react'
import { ProductsContext } from '../../contexts/product.context'
import './shop.styles.scss';
import ProductCard from '../../components/product-card/product-card.component'

export const Shop = () => {
    const { products } = useContext(ProductsContext)
    return <div className='products-container'>
        {products.map((product) => {
            return <ProductCard key={product.id} product={product} />
        })}
    </div>
}