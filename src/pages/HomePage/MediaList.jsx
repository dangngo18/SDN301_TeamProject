import React from 'react'
import MediaCard from '../../components/MediaCard'

export default function MediaList({ media }) {
    return (
        <div className='medialist-container'>
            <span className='medialist-title'>Teaching great coordination tecniques</span>
            <div className='media-container'>
                {media.map((media, index) => (
                    <MediaCard key={'media'+index} media={media} />
                ))}
            </div>
        </div>
    )
}
