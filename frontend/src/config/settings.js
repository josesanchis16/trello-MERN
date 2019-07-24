const settings = {
    backend: {
        host_backend: process.env.NODE_ENV === 'production' ? 'https://todonow-mern-backend.herokuapp.com' : 'http://10.1.0.155:',
        port_backend: process.env.NODE_ENV === 'production' ? '' : '3001',
    }
}

export default settings;