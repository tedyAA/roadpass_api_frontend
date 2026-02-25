import Hero from "../components/Hero.tsx";
import heroVideo from "../assets/video.mov";
import NavBar from "../components/NavBar.tsx";
function Home() {
    return (
        <div>
            <NavBar/>
            <Hero
                title="Want to go on a trip?"
                subtitle="Discover amazing destinations around the world"
                videoSrc={heroVideo}
            />
            <div className="bg-red-500 text-6xl text-red p-4">Hello Tailwind</div>
        </div>
    );
}

export default Home;
