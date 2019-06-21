import React from 'react';

//Importacion de componentes
import Header from '../../Componentes/Headers/HeaderCompleto/Header';
import IndexBody from '../../Componentes/Contents/IndexBody/Index';

//Importacion de estilos
import './Index.css';

class Index extends React.Component {
    render() {
        return (
            <div className="page">
                <Header />
                <IndexBody />
            </div>
        )
    }
}

export default Index;