import * as d3 from 'd3';

/* 
    Video Game Sales: https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json
*/

const movieDataURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

let movieData;

const container = d3.select('#container');

const canvas = container
    .append('svg')
    .attr('width', 800)
    .attr('height', 500)


const fillCells = movie => {
    let category = movie.data.category;

    if (category === 'Action') { return 'orange'}
    else if (category === 'Drama') { return 'lightgreen' }
    else if (category === 'Adventure') { return 'coral' }
    else if (category === 'Family') { return 'lightblue' } 
    else if (category === 'Animation') { return 'pink' } 
    else if (category === 'Comedy') { return 'khaki' }
    else if (category === 'Biography') { return 'tan' }
}

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
            return `translate(${movie.x0}, ${movie.y0})`
        })


    block
        .append('rect')
        .attr('class', 'tile')
        .attr('fill', movie => fillCells(movie))

        // set size for tiles
        .attr('width', movie => movie.x1 - movie.x0 )
        .attr('height', movie => movie.y1 - movie.y0)

        // set data attributes
        .attr('data-name', movie => movie.data.name)
        .attr('data-category', movie => movie.data.category)
        .attr('data-value', movie => movie.data.value)
    
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