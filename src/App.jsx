import React, { useEffect, useRef } from "react";
import TheSidebar from "./components/TheSidebar";
import TheHeader from "./components/TheHeader";
import TheMain from "./components/TheMain";
import TheRegistration from "./components/TheRegistration";
import TheSidebarOverlay from "./components/TheSidebarOverlay";
import BaseToast from "./BaseToast";
import BasePopover from "./BasePopover";

// import './App.css';

function App() {
  const toastRef = useRef();
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

  function showToast(message) {
    toastRef.current.show(message);
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
          <TheMain showToast={showToast} toggleSrolling={toggleSrolling} />
        </div>
      </div>
      <TheRegistration />
      <BaseToast ref={toastRef} />
      <BasePopover />
    </>
  );
}

export default App;
