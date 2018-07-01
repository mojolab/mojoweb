function getDict(entry){
			dict=[]
			$(entry).each(function(){
				
				template={}
				template['id']=this.title.$t
				valuepairs=this.content.$t.split(", ")
				$(valuepairs).each(function(){
					key=$.trim(this.split(": ")[0]);
					value=$.trim(this.split(": ")[1]);
					value=value.replace(",",", ")
					template[key]=value;
				});
				dict.push(template)		
			});
			return dict
		}


function render(template,data){
    for (key in data){
        //console.log("{"+key+"}"+data[key])
        template=template.replace("{"+key+"}",data[key])
    }
    //console.log(template)   
    return template
}



function addTemplateRows(data,template,section,classname){
	data.forEach(function(d){
        var div=document.createElement("div")
        div.setAttribute("class",classname)
        div.innerHTML=render(template,d)
        sec=document.getElementById(section)
        sec.appendChild(div)
	})
}



function displayList(template,url=null,section,classname){
	if (url!=null){
		//console.log(teamurl)
		$.getJSON(url,function(data){
			entry=data.feed.entry
			list=getDict(entry)
			//console.log(team)
			addTemplateRows(list,template,section,classname)
		});
	}
}


