import React, { useState } from "react";
import "./Carousel.css";

const Carousel = ({ screenshots }) => {
    const [current, setCurrent] = useState(0);
    const total = screenshots.length;

    const nextSlide = () => {
        setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
    };

    if (!Array.isArray(screenshots) || total === 0) return null;

    return (
        <div className="carousel">
            <button className="carousel-arrow left" onClick={prevSlide}>
                &#10094;
            </button>
            <div className="carousel-track">
                {screenshots.map((screenshot, index) => (
                    <div
                        className={
                            index === current
                                ? "carousel-slide active"
                                : "carousel-slide"
                        }
                        key={index}
                    >
                        <img src={screenshot} alt={`Screenshot ${index + 1}`} />
                    </div>
                ))}
            </div>
            <button className="carousel-arrow right" onClick={nextSlide}>
                &#10095;
            </button>
        </div>
    );
};

export default Carousel;
