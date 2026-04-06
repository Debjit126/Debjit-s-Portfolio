import { useEffect, useRef, useState } from 'react';
// import { motion } from 'framer-motion';

const Cursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };

    const loop = () => {
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px';
        dotRef.current.style.top  = my + 'px';
      }
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top  = ry + 'px';
      }
      requestAnimationFrame(loop);
    };

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove', onMove);
    };
  }, []);

  const dotStyle = {
    position: 'fixed',
    width: hovered ? '18px' : '8px',
    height: hovered ? '18px' : '8px',
    background: 'var(--g1)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 99999,
    transform: 'translate(-50%, -50%)',
    transition: 'width 0.3s, height 0.3s, background 0.3s',
    mixBlendMode: 'normal',
  };

  const ringStyle = {
    position: 'fixed',
    width: hovered ? '52px' : '34px',
    height: hovered ? '52px' : '34px',
    border: `1px solid rgba(212,175,90,${hovered ? 0.7 : 0.35})`,
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 99998,
    transform: 'translate(-50%, -50%)',
    transition: 'width 0.3s, height 0.3s, border-color 0.3s',
  };

  return (
    <>
      <div ref={dotRef}  style={dotStyle} />
      <div ref={ringRef} style={ringStyle} />
    </>
  );
};

export default Cursor;
