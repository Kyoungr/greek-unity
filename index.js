'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('inert');
const path = require('path');


const init = async() => {

    /**
     * This piece of code creates the server.
     */
    const server = Hapi.server({
        port: 3000,
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'public')
            }
        }
    });

    /**
     * This piece of code allows me to read static files.
     */
    await server.register(Inert);


    /**
     * This piece of code is where I structure my route to access my files
     */
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: { path: './', redirectToSlash: true, listing: true }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();