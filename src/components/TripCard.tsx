import React from "react";
import "./TripCard.css";

interface TripCardProps {
    imageUrl: string;
    title: string;
    rating: number; // 0-5
}

const TripCard: React.FC<TripCardProps> = ({ imageUrl, title, rating }) => {
    return (
        <div className="trip-card" style={{ backgroundImage: `url(${imageUrl})` }}>
            <div className="gradient-overlay">
                <h3 className="trip-title">{title}</h3>
                <div className="trip-rating">
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <span key={idx} className={idx < rating ? "star filled" : "star"}>
              ★
            </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TripCard;
