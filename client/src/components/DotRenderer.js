import React, { useRef, useEffect, useState } from 'react';
import Viz from 'viz.js';
import { Module, render } from 'viz.js/full.render.js';

const DotRenderer = ({ dotCode, containerStyle }) => {
  const svgRef = useRef(null);
const [zoom, setZoom] = useState(1);
const [translateX, setTranslateX] = useState(0);
const [translateY, setTranslateY] = useState(0);
const [isDragging, setDragging] = useState(false);
const [dragStartX, setDragStartX] = useState(0);
const [dragStartY, setDragStartY] = useState(0);

useEffect(() => {
  const viz = new Viz({ Module, render });
  viz.renderSVGElement(dotCode)
    .then((element) => {
      svgRef.current.innerHTML = '';
      svgRef.current.appendChild(element);

      const svg = svgRef.current.querySelector('svg');
      svg.style.cursor = 'grab';
      svg.style.transformOrigin = '0 0';

      svg.addEventListener('mousedown', (e) => {
        setDragging(true);
        setDragStartX(e.clientX - translateX);
        setDragStartY(e.clientY - translateY);
        svg.style.cursor = 'grabbing';
      });

      svg.addEventListener('mousemove', (e) => {
        if (isDragging) {
          setTranslateX(e.clientX - dragStartX);
          setTranslateY(e.clientY - dragStartY);
        }
      });

      svg.addEventListener('mouseup', () => {
        setDragging(false);
        svg.style.cursor = 'grab';
      });

      svg.addEventListener('mouseleave', () => {
        setDragging(false);
        svg.style.cursor = 'grab';
      });

      // Zoom con el scroll del mouse
      svg.addEventListener('wheel', (e) => {
        e.preventDefault();

        // Calcula el nuevo zoom
        const newZoom = zoom + e.deltaY * -0.01;

        // Limita el zoom máximo
        if (newZoom > 10) return;

        // Establece el nuevo zoom
        setZoom(newZoom);
      });

      // Evitar que el evento de rueda afecte al documento
      svg.addEventListener('wheel', (e) => {
        e.preventDefault();
      });

      svg.style.width = '1600px';
      svg.style.height = '1000px';
    })
    .catch((error) => {
      console.error(error);
    });
}, [dotCode, zoom, translateX, translateY, isDragging, dragStartX, dragStartY]);

  return (
    <div
      style={{
        ...containerStyle,
        width: '800px',
        height: '500px',
        border: '5px solid rgb(116,37,207)',
        overflow: 'hidden', // Asegura que no haya barras de desplazamiento en el contenedor
      }}
    >
      <div
        ref={svgRef}
        style={{
          width: '100%',
          height: '100%',
          userSelect: 'none',
          transform: `scale(${zoom}) translate(${translateX}px, ${translateY}px)`,
          transformOrigin: '0 0',
        }}
      />
    </div>
  );
};

export default DotRenderer;