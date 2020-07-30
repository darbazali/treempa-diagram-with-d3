import * as d3 from 'd3';

/* 
    Video Game Sales: https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json
*/

const movieDataURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

let movieData;

const container = d3.select('#container');

const canvas = container.append('svg');




const drawTreeMap = () => {

    const hierarchy = d3
        .hierarchy(movieData, node => node.children)
        .sum( node => node.value )
        .sort( (node1, node2) => node2.value - node1.value )

    const createTreeMap = d3
        .treemap()
        .size([1000, 600])

    createTreeMap(hierarchy)

    const movieTiles = hierarchy.leaves()

    const block = canvas
        .selectAll('g')
        .data(movieTiles)
        .enter()
        .append('g')
        .attr('transform', movie => {
            return `translate(${movie['x0']}, ${movie['y0']})`
        })


    block
        .append('rect')
        .attr('class', 'tile')
    
}




/*============================================
    FETCH THE DATA
=============================================*/
d3
    .json( movieDataURL )
    .then( (data, error) => {
        if ( error ) { throw error }
        else {
            movieData = data;
            // pass the drawer function here
            drawTreeMap()
        }
    })