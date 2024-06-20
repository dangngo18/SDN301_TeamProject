import React from 'react'
import { ProductList1 } from './ProductList1'

export default function ProductList3({ products }) {
    return (
        <>
            <div className='banner-container'>
                <img className='banner-img' src="/img/banner2.png" alt="" />
            </div>
            <div>
                <ProductList1 products={products} />
            </div>
        </>
    )
}
