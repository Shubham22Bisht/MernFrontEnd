import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import SplitType from 'split-type';
import "./style.css";

export const GetStarted = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);
  const backgroundRef = useRef(null);

  const handleGetStarted = () => {
    navigate("/auth");
  };

  useEffect(() => {
    gsap.fromTo(backgroundRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2 }
    );

    // Splitting the title text into words
    const splitTitle = new SplitType(titleRef.current, { types: 'words' });

    // Animating the words to tumble in
    gsap.fromTo(splitTitle.words,
      { opacity: 0, rotationX: -360, y: -50 },
      { opacity: 1, rotationX: 0, y: 0, duration: 1.5, stagger: 0.1, ease: "back.out(1.7)" }
    );

    gsap.fromTo(paragraphRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, delay: 1.5, ease: "power3.out" }
    );

    gsap.fromTo(buttonRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1.5, delay: 2, ease: "elastic.out(1, 0.3)" }
    );

    // Adding mind-blowing animation to the paragraph element
    gsap.fromTo(paragraphRef.current,
      { 
        opacity: 0, 
        rotation: -360, 
        scale: 0, 
        skewX: 45 
      },
      { 
        opacity: 1, 
        rotation: 0, 
        scale: 1, 
        skewX: 0, 
        duration: 2, 
        delay: 2.5, 
        ease: "back.out(1.7)"
      }
    );
  }, []);

  return (
    <div className="get-started" ref={backgroundRef}>
      <div className="overlay">
        <h1 className="superHeadingLandingPage" ref={titleRef}>Welcome to Recipe Hub</h1>
        <p className="subHeading" ref={paragraphRef}>Explore, add, and share your favorite recipes!</p>
        <button ref={buttonRef} className="get-started-button" onClick={handleGetStarted}>Get Started</button>
      </div>
    </div>
  );
};
