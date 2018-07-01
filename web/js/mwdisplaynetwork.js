


function removeToolTip(){
	d3.selectAll(".tooltip").style("opacity",0)
}



function displayNetwork(url,section){
    $.getJSON(url,function(data){
    console.log(data)
        displayNetworkGraph(data)
    })
        
}

function displayNetworkGraph(networkgraph=null){
	var width = $("#networkmap").width();
	var height = Math.max(500,16000/width);
	
	var svg = d3.select("#networkmap").append("svg").attr("width",width).attr("height",height);
	var color = d3.scaleOrdinal(d3.schemeCategory20);
		
	var simulation = d3.forceSimulation()
	.force("link", d3.forceLink().id(function(d) { return d.id; }))
	.force("charge", d3.forceManyBody().strength(-1500))
	.force("center", d3.forceCenter(width / 2, height / 2+10));

if (networkgraph!=null){
		graph=networkgraph
		var node = svg.append("g")
			.attr("class", "nodes")
			.selectAll("circle")
			.data(graph.nodes)
			.enter().append("circle")
				 .attr("r", function(d) {return d.radius;  })
				 .attr("fill", function(d) {return d.color;  })
				 .call(d3.drag()
					.on("start", dragstarted)
					.on("drag", dragged)
					.on("end", dragended));
				
		svg.selectAll("circle").on("mouseover", function(d){
			if (d.id!="root"){
				d3.select(this).attr("fill","violet")
			}	
		});
		svg.selectAll("circle").on("mouseout", function(d){
			if (d.id!="root"){
				d3.select(this).attr("fill",function(d) {return d.color;  })
				d3.select(".tooltip").transition(1000).style("opacity",0).style('position', 'absolute').style("left","-9999px").style("visibility","hidden")
								
			}		
			
		});
		var tooltip=d3.select("#networkmap").append("div")
						.style('position', 'absolute')
						.attr("class","tooltip")
						.style("opacity",0)
						.style("left","-9999px")
                        .style("visibility","hidden")
		
		svg.selectAll("circle").on("click", function(d){
            console.log(d)
			dY=d3.mouse(this)[1]
			dX=d3.mouse(this)[0]
			if (d.id!="root"){	
				d3.select(".tooltip")
						.html("<h2><font style='color: white'>"+d.details.MemberName+"</font></h2>\
								Member Since<h3><font style='color: white'>"+d.details.MemberSince+"</font></h3>\
                                <h3>"+d.details.MemberType+"</h3>")
						.transition(200)
						.style("background",d.color)
						.style("opacity",0.9)
						.style('position', 'relative')
                        .style("left", dX+ "px")	
						.style("top", -height+dY-100 +"px")
						.style("visibility","visible")
										
						
			}
		});
		
		
		 
		var link = svg.append("g")
			.attr("class", "links")
			.selectAll("line")
			.data(graph.links)
			.enter().append("line")
				.attr("stroke-width", function(d) { return Math.sqrt(d.value); });

		

		node.append("svg:title")
			.text(function(d) {return d.label; })
			.attr("dx",12)
			.attr("dy",".35em")
		   
		var labels = svg.append("g")
			.attr("class", "nodelabel")
			.selectAll("text")
			.data(graph.nodes)
			.enter().append("text")
              .attr("class","labeltext")
			  .attr("dx", function(d){return d.radius*0})
			  .attr("dy", function(d){return d.radius*0})
			  .text(function(d) { return d.label });

			   
		simulation
			  .nodes(graph.nodes)
			  .on("tick", ticked);

		simulation.force("link")
			  .links(graph.links);
	

		function ticked(d) {
			link
				.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });

			node
				.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; });
			labels
				.attr("x", function(d) { return d.x; })
				.attr("y", function(d) { return d.y; }); 
		}
	}
	function dragstarted(d) {
		  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
		  d.fx = d.x;
		  d.fy = d.y;
	}

	function dragged(d) {
		  d.fx = d3.event.x;
		  d.fy = d3.event.y;
	}

	function dragended(d) {
		  if (!d3.event.active) simulation.alphaTarget(0);
		  d.fx = null;
		  d.fy = null;
	}
}


