const express 	= require('express')
const morgan  	= require('morgan')
const path    	= require('path')
const fetch	    = require('node-fetch')
const bodyParse = require('body-parser')
const app     	= express()
const port    	= process.env.PORT || 3000

app.use(bodyParse.urlencoded({ extended: false }))
app.use(bodyParse.json())
app.use(morgan('dev'))
app.set("view engine", 'ejs')
app.use(express.static(path.join(__dirname, 'views')))

app.get("/",(req, res) => {
	const url = `https://pokeapi.co/api/v2/pokemon/9/`;
	
	fetch(url)
		.then((res) => {
			return res.json();
		}).then((data) => {
			const nome   	 = data.species.name;
			const imagem 	 = data.sprites.back_default;
			const abilidade1 = data.abilities[0].ability.name;
			const abilidade2 = data.abilities[1].ability.name;
			
			res.render('index.ejs', { nome, imagem, abilidade1, abilidade2 });
		}).catch((err) => {
			console.log(err)
		});
});

app.get("/json",(req, res) => {
	const url = `https://pokeapi.co/api/v2/pokemon/`;
	const nomes = [];
	fetch(url)
		.then((response)=>{
			return response.json()
		}).then((data)=>{
			console.log(data.results.length)
		
			for(var i=1; i < data.results.length;i++){
				const m = `https://pokeapi.co/api/v2/pokemon/${i}/`;

				fetch(m)
					.then((p)=> {
						return p.json();
					}).then((t)=> {
						const l = t.species.name;
						const o = t.sprites.back_default;
						//console.log(`${l} : ${o}`);
						nomes.push(l);
					}).catch((erro)=> {
						console.log(erro)
				});
			}
			
		}).catch((err)=>{
			res.send(err)
	});
	res.render('json.ejs',{ nomes });
	console.log(nomes);
});

app.listen(port, () => {
	const open = `Servidor rodando em http://localhost:${port}`;
	console.log(open);
});