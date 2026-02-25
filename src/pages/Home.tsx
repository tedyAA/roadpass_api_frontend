import { Link } from "react-router-dom";

function Home() {
    return (
        <div style={styles.container}>
            <div style={styles.hero}>
                <h1 style={styles.title}>Trip Explorer</h1>
                <p style={styles.subtitle}>
                    Discover amazing destinations around the world
                </p>
                <Link to="/trips" style={styles.button}>
                    Explore Trips
                </Link>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #1e3c72, #2a5298)",
        color: "white",
    },
    hero: {
        textAlign: "center" as const,
    },
    title: {
        fontSize: "3rem",
        marginBottom: "1rem",
    },
    subtitle: {
        fontSize: "1.2rem",
        marginBottom: "2rem",
    },
    button: {
        padding: "12px 24px",
        backgroundColor: "#fff",
        color: "#1e3c72",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "bold",
    },
};

export default Home;
