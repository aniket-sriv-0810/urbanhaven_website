import { useEffect, useRef } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const DriverTour = ({ steps, startTour, onTourEnd }) => {
  const driverRef = useRef(null);

  useEffect(() => {
    // Initialize Driver.js instance
    driverRef.current = new driver({
      showProgress: true,
      overlayColor: "rgba(0, 0, 0, 0.7)",
      popoverClass: "custom-driver-popover",
      animate: true,
      steps: steps,
      onDestroy: () => {
        if (onTourEnd) onTourEnd(); // Reset `startTour` when tour ends
      },
    });

    return () => {
      driverRef.current = null;
    };
  }, [steps, onTourEnd]);

  useEffect(() => {
    if (startTour && driverRef.current) {
      driverRef.current.drive();
    }
  }, [startTour]);

  return null; // No UI needed
};

export default DriverTour;
