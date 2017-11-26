import * as d3 from 'd3';

interface INode {
    name: string;
    group: string;
}

const sampleSVG = d3.select('body')
    .append('svg')
    .attr('width', 800)
    .attr('height', 600);

d3.json('/data', (err, data: { nodes: INode[] }) => {
    if (err) {
        throw new Error('Could not load data');
    }

    const node = sampleSVG.selectAll('.node')
        .data(data.nodes)
        .enter()
        .append('g')
        .attr('class', 'node');

    node.append('circle')
        .style('stroke', 'gray')
        .style('fill', 'white')
        .attr('r', 40)
        .attr('cx', (d, i) => {
            return (i + 2) * 100;
        })
        .attr('cy', (d, i) => {
            return (i + 2) * 100;
        })
        .on('mouseover', function() { d3.select(this).style('fill', 'aliceblue'); } )
        .on('mouseout', function() { d3.select(this).style('fill', 'white'); } );

    node.append('text')
        .attr('font', '10px sans-serif')
        .attr('x', (d, i) => (i + 2) * 100)
        .attr('y', (d, i) => (i + 2) * 100)
        .attr('text-anchor', 'middle')
        .text((d: INode) => {
            return d.name;
        });
});
