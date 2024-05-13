import express from "express"
const router = express.Router()
import Produto from "../models/Produto.js"

router.get("/produtos", (req,res) => {
    Produto.findAll().then(produtos => {
        res.render("produtos", {
            produtos : produtos
        })
    })
})

//Cadastrando
router.post("/produtos/new", (req, res) => {
    const nome = req.body.nome
    const categoria = req.body.categoria
    const preco = req.body.preco
    const qtd = req.body.qtd
    Produto.create({
        nome: nome,
        categoria: categoria,
        preco: preco,
        qtd:qtd
    }).then(()=>{
        res.redirect("/produtos")
    }).catch(erro => {
        console.log(erro)
    })
})

//Exluindo
router.get("/produtos/delete/:id", (req, res) => {
    const id = req.params.id
    Produto.destroy({
        where: {
            id: id
        }
    }).then(()=> {
        res.redirect("/produtos")
    }).catch(erro => {
        console.log(erro)
    })
})

//Editando
router.get("/produtos/edit/:id", (req, res) =>{
    const id = req.params.id
    Produto.findByPk(id).then(produto => {
        res.render("produtosEdit", {
            produto: produto
        })
    })
})

//Alteração
router.post("/produtos/update/:id", (req,res)=>{
    const id = req.body.id
    const nome = req.body.nome
    const categoria = req.body.categoria
    const preco = req.body.preco
    const qtd = req.body.qtd
    Produto.update({
        nome: nome,
        categoria: categoria,
        preco: preco,
        qtd:qtd
    },
    {where: {id : id}}
).then(()=>{
    res.redirect("/produtos")
})
})

export default router