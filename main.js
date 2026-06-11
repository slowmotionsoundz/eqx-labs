/**
 * EQX Main Application Entrypoint
 * Coordinates the initialization and communication of the modular Scandinavian components.
 */

import { initHero } from './components/Hero.js?v=4';
import { initHexGrid } from './components/HexGrid.js?v=4';
import { initRoomSlider } from './components/RoomSlider.js?v=4';
import { initLocations } from './components/Locations.js?v=4';
import { initMission } from './components/Mission.js?v=4';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Get container elements
  const heroContainer = document.getElementById('eqx-hero-root');
  const hexGridContainer = document.getElementById('eqx-hex-root');
  const roomSliderContainer = document.getElementById('eqx-slider-root');
  const locationsContainer = document.getElementById('eqx-locations-root');
  const missionContainer = document.getElementById('eqx-mission-root');

  // 2. Initialize RoomSlider Popover
  let sliderInstance = null;
  if (roomSliderContainer) {
    sliderInstance = initRoomSlider(roomSliderContainer);
  }

  // 3. Initialize HexGrid and pass callback to open capability modal
  if (hexGridContainer) {
    initHexGrid(hexGridContainer, (capabilityIndex) => {
      if (sliderInstance && typeof sliderInstance.open === 'function') {
        sliderInstance.open(capabilityIndex);
      }
    });
  }

  // 4. Initialize Hero, Locations, & Mission components
  if (heroContainer) {
    initHero(heroContainer);
  }
  if (locationsContainer) {
    initLocations(locationsContainer);
  }
  if (missionContainer) {
    initMission(missionContainer);
  }

  // 5. Header scroll effect
  const header = document.querySelector('.eqx-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.style.background = 'rgba(27, 29, 28, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
      } else {
        header.style.background = 'none';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = 'none';
      }
    });
  }
});
