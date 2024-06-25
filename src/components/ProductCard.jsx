import React from 'react'
import '../../src/assets/styles/homestyle.scss'
export default function ProductCard({product}) {
  return (
    <div className='ProductCard-container'>
        <div className='ProductCard_img_container'>
            <img className='ProductCard_img' src={product.image} alt="" />
        </div>
        <div className='ProductCard_info_container'>
            <div className='ProductCard_info'>
                <h2 className='Product_name'>{product.name}</h2>
                <h3 className='Product_description'>{product.description}</h3>
            </div>
            <span className='ProductCard_price'>{product.price}</span>
        </div>
    </div>
  )
}
