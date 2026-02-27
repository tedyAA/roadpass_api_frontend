import React, { useEffect } from "react";
import "./TripModal.css";
import type { Trip } from "../types";

interface TripModalProps {
    trip: Trip | null;
    onClose: () => void;
}

const TripModal: React.FC<TripModalProps> = ({ trip, onClose }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!trip) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
            >
                <span className="modal-close" onClick={onClose}>
                    ×
                </span>

                <img src={trip.image_url} alt={trip.name} className="modal-image" />

                <div className="modal-body">
                    <h2>{trip.name}</h2>
                    <p>{trip.short_description}</p>
                    <p>{trip.long_description}</p>
                    <p className="modal-rating">⭐ {trip.rating}/5</p>
                </div>
            </div>
        </div>
    );
};

export default TripModal;
