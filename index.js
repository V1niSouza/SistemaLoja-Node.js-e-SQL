import express from 'express'

const app = express()

import PedidosController from "./controllers/PedidosController.js" 
import ClientesController from "./controllers/ClientesController.js" 
import ProdutosController from "./controllers/ProdutosController.js"
import connection from "./config/sequelize-config.js"

connection.authenticate().then(()=>{
    console.log("Conexão com o banco de dados feita com sucesso!")
}).catch((error) =>{
    console.log(error)
})

connection.query(`CREATE DATABASE IF NOT EXISTS loja`).then(()=>{
    console.log("O banco de dados está criado.")}).catch((error) =>{
        console.log(error)
})


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use("/", PedidosController)
app.use("/", ClientesController)
app.use("/", ProdutosController)



app.get("/",function(req,res){
    const indexs = [
        {imgs: "relogio.jpeg", title:"SMARTWATCH", desc: "Descubra a excelência em tecnologia vestível com nossos smartwatches premium. Design elegante, funcionalidades inteligentes e desempenho confiável em cada pulso!", desc2: "*OPÇÃO EM DESENVOLVIMENTO!"},
        {imgs: "macbookpro6-.jpg", title:"NOTEBOOKs", desc: "Descubra a excelência em notebooks: desempenho potente e design elegante. Transforme sua maneira de trabalhar e criar com nossos modelos premium. Explore agora!", desc2: "*OPÇÃO EM DESENVOLVIMENTO!"},
        {imgs: "smartphones.jpg", title:"SMARTPHONEs", desc: "Descubra o melhor em smartphones: desempenho, tecnologia de ponta, confiabilidade, elegância e inovação em um só lugar. Conecte-se ao futuro. Explore já!", desc2: "*OPÇÃO EM DESENVOLVIMENTO!"},
    ]
    const indexs_2 = [
        {imgs: "acessorios.jpg", title:"ACESSORIOs", desc: "Explore acessórios: qualidade, estilo e funcionalidade reunidos para complementar o seu dispositivo. Descubra uma nova forma de personalizar sua experiência. Veja agora!", desc2: "*OPÇÃO EM DESENVOLVIMENTO!"},
    ]
    res.render("index", {
        indexs: indexs,
        indexs_2: indexs_2
    })
    
})

app.listen(8080, function(erro){
    if(erro){
        console.log("Ocorreu um erro ao iniciar servidor!")
    }else{
        console.log("Servidor iniciado com sucesso!")
    }
})