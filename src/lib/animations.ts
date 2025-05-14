import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Make sure to register plugins
export const initializeGSAP = () => {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
};

export const createFadeInAnimation = (
  element: Element | null,
  start: string = 'top 80%',
  properties = { 
    from: { opacity: 0, y: 50 }, 
    to: { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' } 
  }
) => {
  if (!element) return;
  
  return ScrollTrigger.create({
    trigger: element,
    start,
    onEnter: () => {
      gsap.fromTo(
        element.querySelector('.animate-content') || element,
        properties.from,
        properties.to
      );
    }
  });
};

export const createStaggerAnimation = (
  element: Element | null,
  selector: string,
  start: string = 'top 75%',
  properties = { 
    from: { opacity: 0, y: 30 }, 
    to: { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out' } 
  }
) => {
  if (!element) return;
  
  return ScrollTrigger.create({
    trigger: element,
    start,
    onEnter: () => {
      gsap.fromTo(
        element.querySelectorAll(selector),
        properties.from,
        properties.to
      );
    }
  });
};