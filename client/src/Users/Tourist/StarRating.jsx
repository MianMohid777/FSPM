import React from 'react';

const StarRating = ({ rating }) => {
    // Function to determine the class for each star
    const getStarClass = (index) => {
        if (rating > index + 1) {
            return "on"; // Full star
        } else if (rating > index) {
            return "half"; // Half star
        } else {
            return ""; // Empty star
        }
    };

    return (
        <div className="star-rating">
            {[...Array(5)].map((_, index) => (
                <span key={index} className={`star ${getStarClass(index)}`}>&#9733;</span>
            ))}
            <style>{`
                .star-rating {
                    font-size: x-large;
                }
                .star {
                    width: 23px;
                    display: inline-block;
                    color: gray;
                }
                .star:last-child {
                    margin-right: 0;
                }
                // .star:before {
                //     content:'\\2605';
                // }
                .star.on {
                    color: gold;
                }
                .star.half:after {
                    content:'\\2605';
                    color: gold;
                    position: absolute;
                    margin-left: -20px;
                    width: 10px;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default StarRating;
