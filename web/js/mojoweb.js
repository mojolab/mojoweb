var config= {sheetkey: "",
	styles: [],
	pages: []
}

function addStyleToPage(data,tabletop){
	console.log(data)
	for (row in data){
		style=data[row]
		stylename=style.name
		delete style.name
		stylecontent=JSON.stringify(style)
		newstyle=document.createElement("style")
		newstyle.innerHTML=stylename+stylecontent
		newstyle.innerHTML=newstyle.innerHTML.replace(new RegExp('"', 'g')," ")
		newstyle.innerHTML=newstyle.innerHTML.replace(new RegExp(' , ', 'g')," ; ")
		
		document.getElementsByTagName("head")[0].appendChild(newstyle);
	}
				
}

function addStyles(){
	for (row in config.styles){
		stylekey=config.styles[row].value
		Tabletop.init( { key: stylekey,
                   callback: addStyleToPage,
                   simpleSheet: true } )
	}
		
}

function generateMojoWebsite(data,tabletop){
	confdata=data	
	for (row in confdata){
		if(confdata[row].type=="style"){
			config.styles.push(confdata[row])
		}
		if(confdata[row].type=="page"){
			config.styles.push(confdata[row])
		} 
	}
	addStyles()
	console.log(config)
		
}
