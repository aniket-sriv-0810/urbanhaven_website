import React, { useEffect, useRef } from "react";
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";

const HomeGuide = ({ startTour }) => {
  const tour = useRef(null);

  useEffect(() => {
    tour.current = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: "shadow-md bg-purple-600 text-white",
        scrollTo: true,
      },
    });

    tour.current.addStep({
      id: "navbar",
      text: "This is the navigation bar where you can explore the website.",
      attachTo: { element: ".navbar", on: "bottom" },
      buttons: [{ text: "Next", action: tour.current.next }],
    });

    tour.current.addStep({
      id: "search-bar",
      text: "Use this bar to search for hotels based on location, price, and other filters.",
      attachTo: { element: ".search-bar", on: "bottom" },
      buttons: [
        { text: "Back", action: tour.current.back },
        { text: "Next", action: tour.current.next },
      ],
    });

    tour.current.addStep({
      id: "hotel-cards",
      text: "These are the available hotels. Click on a card to view details.",
      attachTo: { element: ".hotel-cards", on: "top" },
      buttons: [
        { text: "Back", action: tour.current.back },
        { text: "Next", action: tour.current.next },
      ],
    });

    tour.current.addStep({
      id: "pagination",
      text: "Use these buttons to navigate through different hotel listings.",
      attachTo: { element: ".pagination", on: "top" },
      buttons: [
        { text: "Back", action: tour.current.back },
        { text: "Finish", action: tour.current.complete },
      ],
    });

    if (startTour) {
      tour.current.start();
    }
  }, [startTour]);

  return null; // This component doesn't render anything visible
};

export default HomeGuide;
