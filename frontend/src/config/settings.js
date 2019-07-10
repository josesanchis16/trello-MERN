const settings = {
    backend: {
        host_backend: process.env.NODE_ENV === 'production' ? 'https://trello-mern-backend.herokuapp.com' : 'http://localhost:',
        port_backend: process.env.NODE_ENV === 'production' ? '' : '3001',
    }
}

export default settings;