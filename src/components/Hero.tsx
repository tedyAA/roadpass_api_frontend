// src/components/Hero.tsx
import React from "react";
import "./Hero.css";

interface HeroProps {
    title: string;
    subtitle?: string;
    videoSrc: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, videoSrc }) => {
    return (
        <section className="hero">
            <div className="hero-content">
                {/* TEXT */}
                <div className="hero-text">
                    <h1>{title}</h1>
                    {subtitle && <p>{subtitle}</p>}
                </div>

                {/* VIDEO BUBBLE */}
                <div className="video-bubble">
                    <video
                        src={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </div>
            </div>

            {/* WAVES */}
            <svg
                className="hero-waves"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
            >
                <defs>
                    <path
                        id="wave-path"
                        d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
                    />
                </defs>

                <g className="wave1">
                    <use href="#wave-path" x="50" y="3" fill="rgba(255,255,255,.1)" />
                </g>

                <g className="wave2">
                    <use href="#wave-path" x="50" y="0" fill="rgba(255,255,255,.2)" />
                </g>

                <g className="wave3">
                    <use href="#wave-path" x="50" y="9" fill="#ffffff" />
                </g>
            </svg>
        </section>
    );
};

export default Hero;
