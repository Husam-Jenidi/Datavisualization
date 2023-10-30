<template>
    <!--  About the team and project  -->
    <div class="bg-white px-6 lg:px-8 py-32">
        <div class="mx-auto max-w-5xl text-center">
            <h2 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Assignment 1 - Comparing Categories</h2>

        </div>
    </div>

    <!-- The charts are here -->
    <div class="bg-white px-6 lg:px-8 text-center">
        <div class="mx-auto max-w-5xl">
            <p class="mt-4 text-base leading-7 text-indigo-600 sm:text-2xl">Abundance of Trees</p>
            <p class="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 text-center">
                Urban forests, comprised of city trees, are crucial for sustainable cities, enhancing health, air quality, carbon storage, and temperature regulation. A new dataset containing information on 5.6 million trees from 63 major US cities has been compiled, including details on location, species, nativity, health, and more. This dataset can be used in combination with citizen science data to design diverse and rich urban ecosystems.
            </p>
            <div class="flex justify-center py-3" id="A1chart1">
                <div class="tooltip A1chart1Inner"></div>
            </div>
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3'
export default {
    name: 'AssignmentOne',
    mounted() {

        // Chart dimensions
        const margin = { top: 10, right: 100, bottom: 50, left: 100 };
        const width = 800 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // Create SVG element
        const svg = d3.select("#A1chart1")
            .append("svg")
            .attr("viewBox", `0 0 1000 500`)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Define data URL
        const dataUrl = "/data.csv";
        // Load data
        d3.csv(dataUrl).then(function (data) {
            // Draw chart
            drawChart(data);
        }).catch(function (error) {
            console.error("Error loading data:", error);
        });

        // Function to draw the chart
        function drawChart(data) {
            // Create X scale
            const x = d3.scaleLinear()
                .domain([0, 1300])
                .range([0, width]);

            // Create Y scale
            const y = d3.scaleBand()
                .range([0, height])
                .domain(data.map(d => d.common_name))
                .padding(0.1);

            // Append X axis
            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

            // Append Y axis
            svg.append("g")
                .call(d3.axisLeft(y));

            // Create tooltip
            const tooltip = d3.select("#A1chart1")
                .append("div")
                .attr("class", "tooltip");

            // Mouse event functions
            function mouseover(event, d) {
                const totalAmount = d.count;
                const treeType = d.common_name;
                const averageHeight = d.average_height;
                tooltip
                    .html(`Tree Type: ${treeType}<br>Total Amount: ${totalAmount}<br>Canopy average_height: ${averageHeight}`)
                    .style("opacity", 1);
                d3.select(this).attr("fill", "#0e6efc");
            }

            function mousemove() {
                tooltip
                    .style("left", `${event.pageX + 40}px`)
                    .style("top", `${event.pageY + 5}px`);
            }

            function mouseleave() {
                tooltip.style("opacity", 0);
                d3.select(this).attr("fill", d => scolor(d.count));
            }

            // Color scales
            const scolor = d3.scaleSequential()
                .domain([0, d3.max(data, d => d.count)])
                .interpolator(d3.interpolateGreens);

            const scolor2 = d3.scaleSequential()
                .domain([300, 270])
                .interpolator(d3.interpolateGreys);

            // Create bars
            const bars = svg.selectAll(".bar")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", x(0))
                .attr("y", d => y(d.common_name))
                .attr("width", 0)
                .attr("height", y.bandwidth())
                .attr("fill", d => scolor(d.count))
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave);

            // Add count labels
            svg.selectAll(".label")
                .data(data)
                .enter()
                .append("text")
                .attr("class", "label")
                .text(d => d.count)
                .attr("x", d => x(d.count) - 30)
                .attr("y", d => y(d.common_name) + 14)
                .attr("text-anchor", "right")
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("fill", d => scolor2(d.count));

            // Animation
            bars.transition()
                .duration(800)
                .attr("x", () => x(0))
                .attr("width", d => width - (width - x(d.count)))
                .delay((d, i) => i * 100);
        }

    },
}

</script>

<style>
/* Your component's styles here */
.tooltip {
    opacity: 0;
    background-color: white;
    border: solid;
    border-width: 2px;
    border-radius: 5px;
    padding: 10px;
    position: absolute;
    z-index: 1080;
    display: block;
    margin: 0;
    font-family: var(--bs-font-sans-serif);
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    text-align: left;
    text-align: start;
    text-decoration: none;
    text-shadow: none;
    text-transform: none;
    letter-spacing: normal;
    word-break: normal;
    word-spacing: normal;
    white-space: normal;
    line-break: auto;
    font-size: .875rem;
    word-wrap: break-word;
    opacity: 0;
}
</style>
