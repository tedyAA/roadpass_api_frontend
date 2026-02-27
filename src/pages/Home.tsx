import Hero from "../components/Hero.tsx";
import heroVideo from "../assets/video.mov";
import NavBar from "../components/NavBar.tsx";
import './Home.css';
import TripCard from "../components/TripCard.tsx";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Trip } from "../types";
import { backupTrips } from "../helpers/backup";

function Home() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            setLoading(true);

            try {
                const response = await axios.get("http://localhost:3000/api/v1/trips", {
                    params: { per_page: 3, page: 1 },
                });
                if (Array.isArray(response.data.trips) && response.data.trips.length > 0) {
                    setTrips(response.data.trips);
                } else {
                    setTrips(backupTrips.slice(0, 3)); // fallback
                }
            } catch (err: any) {
                setTrips(backupTrips.slice(0, 3)); // fallback
            } finally {
                setTimeout(() => setLoading(false), 1000); // simulate 1s loading
            }
        };

        fetchTrips();
    }, []);

    return (
        <div>
            <NavBar />
            <Hero
                title="Want to go on a trip?"
                subtitle="Discover amazing destinations around the world"
                videoSrc={heroVideo}
            />

            <section className="stairs-section">
                <div className="cards-left">
                    {loading && (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className={`card-wrapper card${i + 1}`}>
                                <div className="trip-card skeleton">
                                    <div className="skeleton-image" />
                                    <div className="skeleton-content">
                                        <div className="skeleton-line title" />
                                        <div className="skeleton-line small" />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                    {!loading && trips.map((trip, i) => (
                        <div key={trip.id || i} className={`card-wrapper card${i + 1}`}>
                            <TripCard trip={trip} />
                        </div>
                    ))}
                </div>

                <div className="content-right">
                    <h2>Section Title</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                    </p>
                    <Link to="/trips">
                        <button className="btn">Explore Trips</button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Home;
