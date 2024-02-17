//Common JS modules
const fs = require('fs')
const http = require('http');
const url = require('url');

// 3rd party modules
const slugify = require('slugify');

//User-defined modules
const replaceTemplate = require('./modules/replaceTemplate');

//////////////////////////////////////
//2. SERVERS
//Reading the templates
const tempOverview = fs.readFileSync('./templates/overview.html', 'utf-8');
const tempProduct = fs.readFileSync('./templates/product.html', 'utf-8');
const tempCard = fs.readFileSync('./templates/card.html', 'utf-8');

//Reading the data.json file
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
//Coverting JSON format to a JS Object
const dataObj = JSON.parse(data);

const slugsArr = dataObj.map(el => slugify(el.productName, { lower: true }));

//Create the server
const server = http.createServer((request, response) => {

    //Creating a variable from the url
    const { query, pathname } = url.parse(request.url, true);

    //Overview page
    if (pathname === '/' || pathname === '/overview') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        const cardsHtml = dataObj.map(element => replaceTemplate(tempCard, element)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        response.end(output);

        //Product page
    } else if (pathname === '/product') {

        response.writeHead(200, { 'Content-Type': 'text/html' });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product)
        response.end(output);

        //API Page
    } else if (pathname === '/api') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(data);

        //NOT FOUND
    } else {
        response.writeHead(404);
        response.end('PAGE NOT FOUND');
    }
});
//Start the created server
server.listen(8000, '127.0.0.1', () => {
    console.log('Server started: Listening to requests on port 8000');
});
