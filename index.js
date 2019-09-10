const express 	= require('express')
const morgan  	= require('morgan')
const path    	= require('path')
const fetch	    = require('node-fetch')
const bodyParse = require('body-parser')
const ejsLint   = require('ejs-lint')
const app     	= express()
const port    	= process.env.PORT || 3000

ejsLint.lint()
app.use(bodyParse.urlencoded({ extended: false }))
app.use(bodyParse.json())
app.use(morgan('dev'))
app.set("view engine", 'ejs')
app.use(express.static(path.join(__dirname, 'views')))

app.get("/",(req, res) => {
		res.render('index.ejs');
});

app.get("/json",(req, res) => {
	res.render("json")
});


app.listen(port, () => {
	const open = `Servidor rodando em http://localhost:${port}`;
	console.log(open);
});