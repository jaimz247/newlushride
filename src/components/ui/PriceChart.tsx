import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface PriceData {
  date: string;
  price: number;
}

interface PriceChartProps {
  data: PriceData[];
  currencySymbol?: string;
}

export default function PriceChart({ data, currencySymbol = '₦' }: PriceChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 300;
    const height = 120;
    const margin = { top: 10, right: 10, bottom: 20, left: 45 };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.date)) as [Date, Date])
      .range([0, innerWidth]);

    const y = d3.scaleLinear()
      .domain([0, (d3.max(data, d => d.price) as number) * 1.2])
      .range([innerHeight, 0]);

    const line = d3.line<PriceData>()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.price))
      .curve(d3.curveMonotoneX);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d => d3.timeFormat("%a")(d as Date)))
      .attr("color", "rgba(255,255,255,0.1)")
      .selectAll("text")
      .attr("font-size", "9px")
      .attr("fill", "rgba(255,255,255,0.5)");

    g.append("g")
      .call(d3.axisLeft(y).ticks(3).tickFormat(d => {
        const val = d as number;
        if (currencySymbol === '$') {
           return `$${val}`;
        }
        return `₦${val/1000}k`;
      }))
      .attr("color", "rgba(255,255,255,0.1)")
      .selectAll("text")
      .attr("font-size", "9px")
      .attr("fill", "rgba(255,255,255,0.5)");

    // Add line
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#F9D300")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add dots
    g.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", d => x(new Date(d.date)))
      .attr("cy", d => y(d.price))
      .attr("r", 3)
      .attr("fill", "#0A0A0A")
      .attr("stroke", "#F9D300")
      .attr("stroke-width", 2);

  }, [data]);

  return (
    <div className="w-full flex justify-center bg-[#111] border border-white/5 rounded-lg p-4">
      <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 300 120" preserveAspectRatio="xMidYMid meet" className="overflow-visible" />
    </div>
  );
}
