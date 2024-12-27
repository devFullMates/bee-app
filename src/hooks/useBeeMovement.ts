import { useState, useRef, useEffect } from 'react';
import { throttle } from 'lodash';
import { MAX_BEES, BEE_THROTTLE_MS } from '../constants/config';

interface BeePosition {
  x: number;
  y: number;
}

export const useBeeMovement = () => {
  const [bees, setBees] = useState<BeePosition[]>([]);
  const beesRef = useRef<BeePosition[]>([]);
  const [beeImage, setBeeImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = '/bee.png';
    img.onload = () => setBeeImage(img);

    let lastKnownMouseX = 0;
    let lastKnownMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      lastKnownMouseX = event.clientX;
      lastKnownMouseY = event.clientY;
      updateBeePosition(lastKnownMouseX, lastKnownMouseY);
    };

    const handleScroll = () => {
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      updateBeePosition(lastKnownMouseX + scrollX, lastKnownMouseY + scrollY);
    };

    const updateBeePosition = (clientX: number, clientY: number) => {
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      
      const newBee = {
        x: clientX + scrollX,
        y: clientY + scrollY
      };
      
      beesRef.current = [...beesRef.current, newBee];
      if (beesRef.current.length > MAX_BEES) {
        beesRef.current.shift();
      }
      setBees([...beesRef.current]);
    };

    const throttledMouseMove = throttle(handleMouseMove, BEE_THROTTLE_MS);
    const throttledScroll = throttle(handleScroll, BEE_THROTTLE_MS);

    window.addEventListener('mousemove', throttledMouseMove);
    window.addEventListener('scroll', throttledScroll);

    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  return { bees, beeImage };
};
