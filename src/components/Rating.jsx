import React from 'react'

export const Rating = ({ rating }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="rating">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <div key={`full-${index}`} className="rating__star rating__star--filled">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                  fill="#90FF00" stroke="#90FF00" strokeWidth="1.5"/>
          </svg>
        </div>
      ))}
      
      {/* Half star */}
      {hasHalfStar && (
        <div className="rating__star rating__star--half">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                  fill="#90FF00" stroke="#90FF00" strokeWidth="1.5"/>
          </svg>
        </div>
      )}
      
      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <div key={`empty-${index}`} className="rating__star rating__star--empty">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                  fill="none" stroke="#FFFFFF" strokeWidth="1.5"/>
          </svg>
        </div>
      ))}
    </div>
  )
}
