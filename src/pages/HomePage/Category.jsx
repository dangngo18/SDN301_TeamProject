import React, { useState } from 'react';
import { Icon } from '../../assets/icon/icons';
import '../../../src/assets/styles/homestyle.scss';

export default function Category({ item }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragCurrentX, setDragCurrentX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? item.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === item.length - 1 ? 0 : prevIndex + 1));
    };

    const handleDragStart = (e) => {
        setIsDragging(true);
        setDragStartX(e.clientX || e.touches[0].clientX);
    };

    const handleDrag = (e) => {
        if (isDragging) {
            setDragCurrentX(e.clientX || e.touches[0].clientX);
        }
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        const dragDistance = dragCurrentX - dragStartX;

        if (dragDistance > 50) {
            handlePrev();
        } else if (dragDistance < -50) {
            handleNext();
        }

        setDragStartX(0);
        setDragCurrentX(0);
    };

    return (
        <div className='category-container'>
            <div
                className='category-items-container'
                onMouseDown={handleDragStart}
                onMouseMove={handleDrag}
                onMouseUp={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDrag}
                onTouchEnd={handleDragEnd}
            >
                {item.map((categoryItems, index) => (
                    <div
                        className='category-items-page'
                        key={index}
                        style={{ translate: `${-100 * currentIndex}%`, transform: isDragging ? 'none' : 'transform 0.3s ease' }}
                    >
                        {categoryItems.map((items, innerIndex) => (
                            <div className='category-items' key={innerIndex}>
                                <div className='category-items-img'>
                                    <img className='categor-img' src="public/img/Logo.jpg" alt={items.category} />
                                </div>
                                <div className='category-items-text'>
                                    {items.category}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className='category-btn-container'>
                <button className='CheveronLeftStick' onClick={handlePrev}>
                    {Icon.Left}
                </button>
                <div className='dots'>
                    {item.map((_, index) => (
                        <div key={index} className={currentIndex === index ? 'dot-active' : 'dot'} />
                    ))}
                </div>
                <button className='CheveronRightStick' onClick={handleNext}>
                    {Icon.Right}
                </button>
            </div>
        </div>
    );
}