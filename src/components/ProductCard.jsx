import React from 'react'
import '../../src/assets/styles/homestyle.scss'
export default function ProductCard({ product }) {
  const formatPriceToVND = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };
  return (
    <div className='ProductCard-container'>
      <div className='ProductCard_img_container'>
        <img className='ProductCard_img' src={product.urlImage} alt="" />
      </div>
      <div className='ProductCard_info_container'>
        <div className='ProductCard_info'>
          <h2 className='Product_name'>{product.productBrand}</h2>
          <h3 className='Product_description'>{product.productName}</h3>
        </div>
        <span className='ProductCard_price'>{formatPriceToVND(product.price)}</span>
      </div>
    </div>
  )
}
