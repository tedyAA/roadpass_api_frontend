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

function Home() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/trips", {
                    params: { per_page: 3, page: 1 },
                });
                setTrips(response.data.trips);
            } catch (err: any) {
                setError(err.message || "Error fetching trips");
            } finally {
                setLoading(false);
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
                    {loading && <p>Loading trips...</p>}
                    {error && <p>Error: {error}</p>}
                    {!loading && !error && trips.map((trip, i) => (
                        <div key={trip.id} className={`card-wrapper card${i + 1}`}>
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
