// based off of https://betterprogramming.pub/5-steps-to-render-d3-js-with-react-functional-components-fcce6cec1411
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { select, update } from 'd3';
import * as d3 from "d3";
import debounce from 'lodash/debounce';

const height = 1000;
const radius = 100;
const width = 1000;

export const Circles = ({ data }) => {
  const [pageWidth, setWidth] = useState(0);
  const containerRef = useRef(null);

  // for page resizing
  useEffect(() => {
    function updateWidth() {
      setWidth(containerRef.current.clientWidth / (data.length + 1));
    }
    const handleResize = debounce(updateWidth, 500);
    updateWidth();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [data.length]);

  // to get rid of the page-glitch effect
  useLayoutEffect(() => {
    const g = select('g')
      .attr("class", "circles")
      .attr("cursor", "grab");

    g.append("style").text(`
      .circles {
        stroke: transparent;
        stroke-width: 1.5px;
      }
      .circles circle:hover {
        stroke: black;
      }`);

    if (Array.isArray(data)) {
      // set up the data to use (should be passed in)
      g.selectAll("circle")
        .data(data)
        .join("circle")
          .datum(([x, y], i) => [x, y, i])
          .attr("cx", ([x]) => x)
          .attr("cy", ([, y]) => y)
          .attr("r", radius)
          .attr("fill", ([,, i]) => d3.interpolateRainbow(i / 360))
        .append("title")
          .text((d, i) => `circle ${i}`);
      
      g.call(d3.zoom()
        .extent([[0, 0], [width, height]])
        .scaleExtent([1, 8])
        .on("zoom", zoomed));
      
      function zoomed({transform}) {
        g.attr("transform", transform);
      }
    }
  }, [data]);

  return (
    <svg width="100%" height={data.length} ref={containerRef}>
      <g transform="translate(0, 100)" />
    </svg>
  );
};

const ThumbnailZoom = () => {
  let theta = Math.PI * (3 - Math.sqrt(5));
  var data = Array.from({length: 2000}, (_, i) => {
    const dataRadius = 1 * radius * Math.sqrt(i += 0.5), a = theta * i;
    return [
      width / 2 + dataRadius * Math.cos(a),
      height / 2 + dataRadius * Math.sin(a)
    ];
  });

  return (
    <Circles data={data}/>
  );
};

export {ThumbnailZoom};