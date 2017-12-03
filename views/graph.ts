import * as d3 from 'd3';

interface IData {
    nodes: INode[];
    links: ILink[];
}

interface INode {
    id: number;
    name: string;
    group: string;
}

interface ILink {
    from: number;
    to: number;
}

// Main SVG to draw on
const baseSVG = d3.select('body')
    .append('svg')
    .attr('width', 800)
    .attr('height', 600)
    .call(d3.zoom().on('zoom', () => {
        baseSVG.attr('transform', d3.event.transform);
    }))
    .append('g');

// Handles drawing data
d3.json('/data', (err, data: IData) => {
    if (err) {
        throw new Error('Could not load data');
    }
    const nodes = data.nodes;
    const links = data.links;

    const node = baseSVG.selectAll('.node')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('id', (d) => 'node-' + d.id);

    // Append all nodes as circles
    node.append('circle')
        .style('stroke', 'gray')
        .style('fill', 'white')
        .attr('r', 40)
        .attr('cx', (d, i) => Math.min(750, Math.random() * (i + 2) * 100))
        .attr('cy', (d, i) => Math.min(550, Math.random() * (i + 2) * 100))
        .on('mouseover', function() { d3.select(this).style('fill', 'aliceblue'); } )
        .on('mouseout', function() { d3.select(this).style('fill', 'white'); } );

    // Append nodes' text
    node.append('text')
        .attr('font', '10px sans-serif')
        .attr('x', (d, i) => d3.select('#node-' + d.id).select('circle').attr('cx'))
        .attr('y', (d, i) => d3.select('#node-' + d.id).select('circle').attr('cy'))
        .attr('text-anchor', 'middle')
        .text((d: INode) => {
            return d.name;
        });

    // Draw links between nodes
    const link = baseSVG.selectAll('.link')
        .data(links)
        .enter()
        .append('g')
        .attr('class', 'link');

    link.append('line')
        .attr('x1', (d) => d3.select('#node-' + d.from).select('circle').attr('cx'))
        .attr('y1', (d) => d3.select('#node-' + d.from).select('circle').attr('cy'))
        .attr('x2', (d) => d3.select('#node-' + d.to).select('circle').attr('cx'))
        .attr('y2', (d) => d3.select('#node-' + d.to).select('circle').attr('cy'))
        .attr('stroke', '#ccc');
});
