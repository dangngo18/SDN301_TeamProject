import React from 'react'
import ProductCard from '../../components/ProductCard'

export function ProductList1({products}) {
    return (
        <div className='productlist-1-container container'>
            <div className='productlist-1-header'>
                <div className='productlist-1-title'>
                    <div className='productlist-1-title-text1'>Just drop</div>
                    <div className='productlist-1-title-text2'>Has been release</div>
                </div>
                <div className='productlist-1-see-more'>
                    See more
                </div>
            </div>
            <div className='productlist-1-product'>
                {products.map((product, index) => (
                    <ProductCard product={product} key={index}/>
                ))}
            </div>
            <div className='ProductList-1-see-more-button'>
                <button>See more</button>
            </div>
        </div>
    )
}
