import React, { useEffect, useRef } from "react";
import TheSidebar from "./components/TheSidebar";
import TheHeader from "./components/TheHeader";
import TheMain from "./components/TheMain";
import TheRegistration from "./components/TheRegistration";
import TheSidebarOverlay from "./components/TheSidebarOverlay";
// import './App.css';

function App() {
  const contentWrapperRef = useRef(null);
  let isScrollingEnabled = true;

  function toggleSrolling(isEnabled) {
    isScrollingEnabled = isEnabled;
  }

  function handleScrolling(event) {
    if (isScrollingEnabled) return;

    event.preventDefault();
    event.stopPropagation();
  }

  useEffect(() => {
    const contentWrapper = contentWrapperRef.current;
    contentWrapper.addEventListener("wheel", handleScrolling);
    return () => contentWrapper.removeEventListener("wheel", handleScrolling);
  });

  return (
    <>
      <div className="flex grow overflow-auto">
        <TheSidebar />
        <TheSidebarOverlay />
        <div ref={contentWrapperRef} className="flex-1 overflow-auto">
          <TheHeader />
          <TheMain toggleSrolling={toggleSrolling} />
        </div>
      </div>
      <TheRegistration />
    </>
  );
}

export default App;
