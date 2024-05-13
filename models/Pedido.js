import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const Pedido = connection.define('pedidos', {
    numero:{
        type: Sequelize.INTEGER,
        allowNull: false
    }, 
    valor:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    tpagamento:{
        type: Sequelize.STRING,
        allowNull: false
    },
    status:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Pedido.sync({force: false})
export default Pedido