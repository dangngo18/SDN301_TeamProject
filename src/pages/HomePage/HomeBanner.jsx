import React, { useState } from 'react';
import { Icon } from '../../assets/icon/icons';
import '../../../src/assets/styles/homestyle.scss';
export default function HomeBanner() {
  const [carousel, setCarousel] = useState([
    './img/slide-item.png',
    './img/slide-item2.png',
    './img/slide-item3.png',
    './img/slide-item4.png',
    './img/slide-item5.png',
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carousel.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === carousel.length - 1 ? 0 : prevIndex + 1));
    console.log("click")
  };

  return (
    <div className='Carousel-wrapper'>
      <div className='slide-container'>
        <div className='img-container'>
          {
            carousel.map((image, index) => (
              <img key={image} src={image} alt="" className='Carousel-image' 
              style={{ translate: `${-100 * currentIndex}%`}}/>
            ))
          }
        </div>
        <div className='Cheveron'>
          <button className='CheveronLeft' onClick={handlePrev}>
            {Icon.LeftBanner}
          </button>
          <button className='CheveronRight' onClick={handleNext}>
            {Icon.RightBanner}
          </button>
        </div>
      </div>
      <div className='Carousel-page'>
        {carousel.map((_, index) => (
          <button
            key={index}
            className={ index === currentIndex ? 'Carousel-page-item-active' : 'Carousel-page-item'}
            onClick={() => setCurrentIndex(index)}
          >
            
          </button>
        ))}
      </div>
    </div>
  );
}