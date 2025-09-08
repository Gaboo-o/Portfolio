import { useRef, useEffect, useState } from "react";
import smoothScroll from "../utils/_smoothScroll";

export default function About({ data }) {
    const [isActive, setIsActive] = useState(false);
    const hiddenAboutRef = useRef(null);
    const toggleRef = useRef(null);

    const handleToggle = () => {
        setIsActive(prev => {
            const next = !prev;
            if (next) smoothScroll(hiddenAboutRef.current);
            return next;
        });
    };
    
    useEffect(() => {
        const handleOpen = () => {
            setIsActive(true);
        };

        toggleRef.current?.addEventListener("open", handleOpen);

        return () => {
            toggleRef.current?.removeEventListener("open", handleOpen);
        };
    }, []);

    return (
        <header id="top">
            {/* About section */}
            <section className="about">
                <div className="about-text">
                    <h1
                        className="about-title"
                        dangerouslySetInnerHTML={{ __html: data.about.title.replace("\n", "<br>") }}
                    />
                    <p
                        className="about-description"
                        dangerouslySetInnerHTML={{ __html: data.about.description.replace("\n", "<br>") }}
                    />
                </div>

                <div className="about-image-container">
                    <img src={data.about.imageSrc} alt={data.about.imageAlt} />
                </div>
            </section>

            {/* Hidden about section */}
            <section id="about" className={`hidden-about ${isActive ? "active" : ""}`} ref={hiddenAboutRef}>
                <div className="hidden-about-content">
                    <p dangerouslySetInnerHTML={{ __html: data.hiddenAbout.details.replace("\n", "<br>") }} />
                </div>
            </section>

            {/* Toggle button */}
            <div className="toggle-about-container">
                <div className="toggle-about-btn">
                    <img
                        className={`toggle-about-img ${isActive ? "active" : ""}`}
                        ref={toggleRef}
                        src={data.hiddenAbout.toggleOutline.src}
                        alt={data.hiddenAbout.toggleOutline.alt}
                        onClick={handleToggle}
                        onMouseOver={() => {
                            toggleRef.current.src = data.hiddenAbout.toggleFill.src;
                            toggleRef.current.alt = data.hiddenAbout.toggleFill.alt;
                        }}
                        onMouseOut={() => {
                            toggleRef.current.src = data.hiddenAbout.toggleOutline.src;
                            toggleRef.current.alt = data.hiddenAbout.toggleOutline.alt;
                        }}
                    />
                </div>
            </div>
        </header>
    );
}