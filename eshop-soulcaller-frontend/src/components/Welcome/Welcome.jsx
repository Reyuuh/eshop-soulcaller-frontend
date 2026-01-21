import React, { useState, useEffect} from 'react';
import './Welcome.scss';

const Welcome = () => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            title: "Welcome to Soulcaller E-shop",
            description: "Discover a curated collection of unique items for your cards and deck",
            image: "/src/assets/placeholder1.jpg"
        },  

    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }
    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    }


  return (
    <section className="welcome" style={{ backgroundImage: `url(${slides[currentSlide].image})` }}>
      <div className="welcome-content">
        <h1>{slides[currentSlide].title}</h1>
        <p>{slides[currentSlide].description}</p>
      </div>
      {/*<button className="welcome-btn prev" onClick={prevSlide}>❮</button>
      <button className="welcome-btn next" onClick={nextSlide}>❯</button>*/}
    </section>
  );
};

export default Welcome;