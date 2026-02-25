import NavBar from "../components/NavBar.tsx";
import Hero from "../components/Hero.tsx";
import heroVideo from "../assets/video.mov";
import './Trips.css';
import axios from "axios";
import type { Trip } from "../types";
import { useEffect, useState } from "react";
import TripCard from "../components/TripCard.tsx";

function Trips() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Filters
    const [search, setSearch] = useState("");
    const [minRating, setMinRating] = useState<number | "">("");
    const [sort, setSort] = useState<"asc" | "desc" | "">("");

    const perPage = 8;

    const fetchTrips = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/v1/trips", {
                params: {
                    page,
                    per_page: perPage,
                    search: search || undefined,
                    min_rating: minRating || undefined,
                    sort: sort || undefined,
                },
            });

            setTrips(response.data.trips);
            setTotalPages(response.data.meta.total_pages);
        } catch (err: any) {
            setError(err.message || "Error fetching trips");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, [page, search, minRating, sort]);

    // Handle clearing filters
    const handleClearFilters = () => {
        setSearch("");
        setMinRating("");
        setSort("");
        setPage(1);
    };

    if (loading) return <p>Loading trips...</p>;
    if (error) return <p>Error: {error}</p>;

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
                    onChange={(e) => setMinRating(e.target.value ? Number(e.target.value) : "")}
                >
                    <option value="">Min Rating</option>
                    {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>{r}+</option>
                    ))}
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as "asc" | "desc" | "")}
                >
                    <option value="">Sort by rating</option>
                    <option value="asc">Rating Ascending</option>
                    <option value="desc">Rating Descending</option>
                </select>

                <button onClick={handleClearFilters}>Clear Filters</button>
            </div>

            {/* Trips Grid */}
            <section>
                <div className="trips-grid">
                    {trips.map((trip) => (
                        <TripCard key={trip.id} trip={trip} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="pagination">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </button>

                    <span>
                        Page {page} of {totalPages}
                    </span>

                    <button
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Trips;
