import React from "react";
import "./TripCard.css";
import type { Trip } from "../types";

interface TripCardProps {
    trip: Trip;
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
    return (
        <div
            className="trip-card"
            style={{
                backgroundImage: `
            linear-gradient(to top, rgba(0, 0, 0, 0.72), rgba(255, 255, 0, 0)),
            url(${trip.image_url})
        `
            }}
        >
            <div className="gradient-overlay">
                <h3 className="trip-title">{trip.name}</h3>
                <div className="trip-rating">
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <span
                            key={idx}
                            className={idx < trip.rating ? "star filled" : "star"}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TripCard;
