import React, { useEffect, useRef, useState } from "react";
import TheSidebar from "./components/TheSidebar";
import TheHeader from "./components/TheHeader";
import TheMain from "./components/TheMain";
import TheRegistration from "./components/TheRegistration";
import TheSidebarOverlay from "./components/TheSidebarOverlay";
import BaseToast from "./components/BaseToast";
import BasePopover from "./components/BasePopover";
import BaseModal from "./components/BaseModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toastRef = useRef();
  const popoverRef = useRef();

  const contentWrapperRef = useRef();
  let isScrollingEnabled = true;

  useEffect(() => {
    const contentWrapper = contentWrapperRef.current;
    contentWrapper.addEventListener("wheel", handleScrolling);
    return () => contentWrapper.removeEventListener("wheel", handleScrolling);
  });

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
  function showPopover(title, description, target, offset) {
    popoverRef.current.show(title, description, target, offset);
  }

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="flex grow overflow-auto">
        <TheSidebar showPopover={showPopover} />
        <TheSidebarOverlay />
        <div ref={contentWrapperRef} className="flex-1 overflow-auto">
          <TheHeader />
          <TheMain
            openModal={openModal}
            showToast={showToast}
            toggleSrolling={toggleSrolling}
          />
        </div>
      </div>
      <TheRegistration />
      <BaseToast ref={toastRef} />
      <BasePopover ref={popoverRef} />
      {isModalOpen && <BaseModal onClose={closeModal} />}
    </>
  );
}

export default App;
