var config= {sheetkey: "",
	styles: [],
	sections: []
}




function generateMojoWebsite(data,tabletop){
	confdata=data	
	for (row in confdata){
		if(confdata[row].type=="style"){
			config.styles.push(confdata[row])
		}
		if(confdata[row].type=="section"){
			config.sections.push(confdata[row])
		} 
	}
	addStyles()
	addSections()
	console.log(config)
		
}

function addStyles(){
	console.log("Adding styles from config")
	$(config.styles).each(function(){
		style=this
		console.log("Adding style")
		console.log(style)
		stylekey=style.url
		Tabletop.init( { key: stylekey,
                   callback: addStyleToPage,
                   simpleSheet: true } )
	})
	/*for (row in config.styles){
		
	}*/
		
}


function addSections(){
	console.log("Adding sections from config")

	$(config.sections).each(function(){
		section=this
		console.log("Adding section")
		console.log(section)
		newsection=document.createElement("section")
		newsection.id=section.name
		newsection.className=section.classname
		document.getElementsByTagName("body")[0].appendChild(newsection);
		
		/*Tabletop.init( { key: section.url,
                  callback: function(data,tabletop){console.log("Filling section");console.log(section);fillSection(data,tableto)},
                   simpleSheet: true } )
         */
		
	})
	/*for (row in config.sections){
		
		section=config.sections[row]
		console.log("Adding section")
		console.log(section)
		newsection=document.createElement("section")
		newsection.id=section.name
		newsection.className=section.classname
		document.getElementsByTagName("body")[0].appendChild(newsection);
		
		sectionkey=section.url
		
		fillSection(section)
	}*/
		
}





function fillSections(){
	$(config.sections).each(function(){
		section=this
		console.log("Filling section")
		console.log(section)
			
	});
} 	

function addStyleToPage(data,tabletop){
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





