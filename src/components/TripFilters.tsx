import React from "react";
import "./TripFilters.css";

interface TripFiltersProps {
    search: string;
    minRating: number | "";
    sort: "asc" | "desc" | "";
    onSearchChange: (value: string) => void;
    onMinRatingChange: (value: number | "") => void;
    onSortChange: (value: "asc" | "desc" | "") => void;
    onClear: () => void;
    disabled?: boolean;
}

const TripFilters: React.FC<TripFiltersProps> = ({
                                                     search,
                                                     minRating,
                                                     sort,
                                                     onSearchChange,
                                                     onMinRatingChange,
                                                     onSortChange,
                                                     onClear,
                                                     disabled = false,
                                                 }) => {
    return (
        <div className="filters">
            <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                disabled={disabled}
            />

            <select
                value={minRating}
                onChange={(e) =>
                    onMinRatingChange(
                        e.target.value ? Number(e.target.value) : ""
                    )
                }
                disabled={disabled}
            >
                <option value="">Min Rating</option>
                {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                        {r}+
                    </option>
                ))}
            </select>

            <select
                value={sort}
                onChange={(e) =>
                    onSortChange(e.target.value as "asc" | "desc" | "")
                }
                disabled={disabled}
            >
                <option value="">Sort by rating</option>
                <option value="asc">Rating Ascending</option>
                <option value="desc">Rating Descending</option>
            </select>

            <button onClick={onClear} disabled={disabled}>
                Clear Filters
            </button>
        </div>
    );
};

export default TripFilters;
