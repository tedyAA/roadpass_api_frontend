import Hero from "../components/Hero.tsx";
import heroVideo from "../assets/video.mov";
import NavBar from "../components/NavBar.tsx";
import './Home.css'
import TripCard from "../components/TripCard.tsx";
import {Link} from "react-router-dom";

function Home() {
    const trips = [
        {
            id: 1,
            title: "Sunny Beach",
            imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            rating: 5,
        },
        {
            id: 2,
            title: "Mountain Escape",
            imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
            rating: 4,
        },
        {
            id: 3,
            title: "Tropical Paradise",
            imageUrl: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
            rating: 3,
        },
    ];

    return (
        <div>
            <NavBar/>
            <Hero
                title="Want to go on a trip?"
                subtitle="Discover amazing destinations around the world"
                videoSrc={heroVideo}
            />
            <section className="stairs-section">
                <div className="cards-left">
                    {trips.map((trip, i) => (
                        <div key={trip.id} className={`card-wrapper card${i + 1}`}>
                            <TripCard
                                imageUrl={trip.imageUrl}
                                title={trip.title}
                                rating={trip.rating}
                            />
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
        </div>
    );
}

export default Home;
