import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import TripCard from "../components/TripCard";
import Pagination from "../components/Pagination";
import TripModal from "../components/TripModal";
import TripFilters from "../components/TripFilters";

import heroVideo from "../assets/video.mov";
import "./Trips.css";

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
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

    // this is for error simulation
    // change to true to trigger
    const FORCE_ERROR = false;

    const fetchTrips = useCallback(async () => {
        setLoading(true);
        setApiError(false);

        const start = Date.now();

        try {
            if (FORCE_ERROR) {
                throw new Error("Simulated API failure");
            }

            const response = await axios.get(API_URL, {
                params: {
                    page,
                    per_page: PER_PAGE,
                    search: debouncedSearch || undefined,
                    min_rating: minRating || undefined,
                    sort: sort || undefined,
                },
            });

            setTrips(response.data.trips);
            setTotalPages(response.data.meta.total_pages);
        } catch (error) {
            setApiError(true);
            setTrips(backupTrips);
            setTotalPages(1);
        } finally {
            const elapsed = Date.now() - start;
            const remaining = 3000 - elapsed;

            if (remaining > 0) {
                setTimeout(() => setLoading(false), remaining);
            } else {
                setLoading(false);
            }
        }
    }, [page, debouncedSearch, minRating, sort]);

    useEffect(() => {
        fetchTrips();
    }, [fetchTrips]);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, minRating, sort]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    const handleClearFilters = () => {
        setSearch("");
        setDebouncedSearch("");
        setMinRating("");
        setSort("");
        setPage(1);
    };

    return (
        <div className="page">
            <NavBar/>

            <Hero
                title="Discover our luxurious trips!"
                subtitle="Adventure is in your hands"
                videoSrc={heroVideo}
            />

            <TripFilters
                search={search}
                minRating={minRating}
                sort={sort}
                onSearchChange={setSearch}
                onMinRatingChange={setMinRating}
                onSortChange={setSort}
                onClear={handleClearFilters}
                disabled={loading}
            />

            {apiError && (
                <div className="error-state">
                    <div className="error-icon">⚠️</div>
                    <h3>We couldn’t reach our servers</h3>
                    <p>
                        Don’t worry — we’re showing backup trips for now.
                        You can try again anytime.
                    </p>
                    <button className="retry-btn" onClick={fetchTrips}>
                        Try Again
                    </button>
                </div>
            )}

            <section>
                {loading ? (
                    <div className="trips-grid">
                        {Array.from({length: 6}).map((_, i) => (
                            <div key={i} className="trip-card skeleton">
                                <div className="skeleton-image"/>
                                <div className="skeleton-content">
                                    <div className="skeleton-line title"/>
                                    <div className="skeleton-line small"/>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : trips.length === 0 ? (
                    <div className="no-results">
                        <h3>No trips found</h3>
                        <p>
                            Try adjusting your filters or search term to find trips.
                        </p>
                        <button className="btn" onClick={handleClearFilters}>
                            Clear Filters
                        </button>
                    </div>
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

                        {!apiError && totalPages > 1 && (
                            <Pagination
                                page={page}
                                totalPages={totalPages}
                                onPageChange={(newPage) => setPage(newPage)}
                            />
                        )}
                    </>
                )}
            </section>
        </div>
    );
}

export default Trips;
