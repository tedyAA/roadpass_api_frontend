import Hero from "../components/Hero.tsx";
import heroVideo from "../assets/video.mov";
function Home() {
    return (
        <div>
            <Hero
                title="Want to go on a trip?"
                subtitle="Discover amazing destinations around the world"
                videoSrc={heroVideo}
            />
        </div>
    );
}

export default Home;
