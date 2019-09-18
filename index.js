'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('inert');
const path = require('path');


const init = async() => {

    const server = Hapi.server({
        port: 3000,
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'public')
            }
        }
    });

    await server.register(Inert);

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