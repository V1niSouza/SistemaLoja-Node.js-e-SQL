import express from 'express'
const router = express.Router()
import Pedido from "../models/Pedido.js"

router.get("/pedidos", (req,res) => {
    Pedido.findAll().then(pedidos => {
        res.render("pedidos", {
            pedidos : pedidos
        })
    })
})

//Cadastrando
router.post("/pedidos/new", (req, res) => {
    const numero = req.body.numero
    const valor = req.body.valor
    const tpagamento = req.body.tpagamento
    const status = req.body.status
    Pedido.create({
        numero: numero,
        valor: valor,
        tpagamento: tpagamento,
        status:status
    }).then(()=>{
        res.redirect("/pedidos")
    }).catch(erro => {
        console.log(erro)
    })
})

//Exluindo
router.get("/pedidos/delete/:id", (req, res) => {
    const id = req.params.id
    Pedido.destroy({
        where: {
            id: id
        }
    }).then(()=> {
        res.redirect("/pedidos")
    }).catch(erro => {
        console.log(erro)
    })
})

//Editando
router.get("/pedidos/edit/:id", (req, res) =>{
    const id = req.params.id
    Pedido.findByPk(id).then(pedido => {
        res.render("pedidosEdit", {
            pedido: pedido
        })
    })
})

//Alteração
router.post("/pedidos/update/:id", (req,res)=>{
    const id = req.body.id
    const numero = req.body.numero
    const valor = req.body.valor
    const tpagamento = req.body.tpagamento
    const status = req.body.status
    Pedido.update({
        numero: numero,
        valor: valor,
        tpagamento: tpagamento,
        status:status
    },
    {where: {id : id}}
).then(()=>{
    res.redirect("/pedidos")
})
})
export default router