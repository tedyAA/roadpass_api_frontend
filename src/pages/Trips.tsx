import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import TripCard from "../components/TripCard";

import heroVideo from "../assets/video.mov";
import "./Trips.css";
import TripModal from "../components/TripModal";

import type { Trip } from "../types";
import { backupTrips } from "../helpers/backup";

const API_URL = "http://localhost:3000/api/v1/trips";
const PER_PAGE = 9;

function Trips() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("");
    const [minRating, setMinRating] = useState<number | "">("");
    const [sort, setSort] = useState<"asc" | "desc" | "">("");

    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

    const fetchTrips = useCallback(async () => {
        setLoading(true);
        setApiError(false);

        try {
            const response = await axios.get(API_URL, {
                params: {
                    page,
                    per_page: PER_PAGE,
                    search: search || undefined,
                    min_rating: minRating || undefined,
                    sort: sort || undefined,
                },
            });

            setTrips(response.data.trips);
            setTotalPages(response.data.meta.total_pages);
        } catch (error) {
            console.warn("API unavailable — using backup data");
            setApiError(true);
            setTrips(backupTrips);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, [page, search, minRating, sort]);

    useEffect(() => {
        fetchTrips();
    }, [fetchTrips]);

    useEffect(() => {
        setPage(1);
    }, [search, minRating, sort]);

    const handleClearFilters = () => {
        setSearch("");
        setMinRating("");
        setSort("");
        setPage(1);
    };

    return (
        <div className="page">
            <NavBar />

            <Hero
                title="Discover our luxurious trips!"
                subtitle="Adventure is in your hands"
                videoSrc={heroVideo}
            />

            {/* Filters */}
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={minRating}
                    onChange={(e) =>
                        setMinRating(e.target.value ? Number(e.target.value) : "")
                    }
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
                        setSort(e.target.value as "asc" | "desc" | "")
                    }
                >
                    <option value="">Sort by rating</option>
                    <option value="asc">Rating Ascending</option>
                    <option value="desc">Rating Descending</option>
                </select>

                <button onClick={handleClearFilters}>Clear Filters</button>
            </div>

            {apiError && (
                <div className="api-warning">
                    API unavailable — showing backup trips.
                </div>
            )}
            <section>
                {loading ? (
                    <p className="loading">Loading trips...</p>
                ) : (
                    <>
                        <TripModal
                            trip={selectedTrip}
                            onClose={() => setSelectedTrip(null)}
                        />
                        <div className="trips-grid">
                            {trips.map((trip) => (
                                <div key={trip.id} onClick={() => setSelectedTrip(trip)}>
                                    <TripCard trip={trip}/>
                                </div>
                            ))}
                        </div>
                        {!apiError && (
                            <div className="pagination">
                                <button
                                    onClick={() =>
                                        setPage((prev) => Math.max(prev - 1, 1))
                                    }
                                    disabled={page === 1}
                                >
                                    Previous
                                </button>

                                <span>
                Page {page} of {totalPages}
              </span>

                                <button
                                    onClick={() =>
                                        setPage((prev) =>
                                            Math.min(prev + 1, totalPages)
                                        )
                                    }
                                    disabled={page === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
}

export default Trips;
