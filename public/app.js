var graph = new Graph();

var nodes = graph.nodes.map(function(el){
  return {id: el[0]}
});

var width = 640;
var height = 480;


var svg = d3.select('#content').append('svg')
    .attr('width', '100%')
    .attr('height', 472)
    .attr('class', 'img-fluid');

svg.append('svg:defs').append('svg:marker')
    .attr('id', 'end-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 6)
    .attr('markerWidth', 3)
    .attr('markerHeight', 3)
    .attr('orient', 'auto')
    .append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#000');

var nodes = [];
var links = [];

var force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .charge(-800)
    .linkDistance(120)
    .size([width, height])
    .on("tick", tick);

var node = svg.selectAll(".node")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node")
      .call(force.drag);




var path = svg.append('svg:g').selectAll('path');

var linktext = svg.append("svg:g").selectAll("g.linklabelholder");

  
function start() {
  force.nodes(nodes);
  force.links(links);
  path = path.data(force.links());
  path.enter().append('svg:path')
    .attr('class', 'link')
    .attr("id",function(d) { return "linkId_" + Math.floor((d.target.x + d.source.x) + (d.target.y + d.source.y)); })
    .style('marker-end','url(#end-arrow)')
  path.exit().remove();

  node = node.data(force.nodes(), function(d) { return d.id;});
  node.enter().append("g").attr("class", function(d) { return "node " + d.id; }).call(force.drag);
  node.append("circle")
      .attr("r", 8)
      .style("fill",function(d){
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
      })

  node.append("text")
    .attr("dx", 12)
    .attr("dy", ".35em")
    .text(function(d) { return d.id });

  node.exit().remove();

  linktext = linktext.data(force.links());
  linktext.enter().append("g").attr("class", "linklabelholder")
     .append("text")
     .attr("class", "linklabel")
     .attr("x", function(d) {return 40})
     .attr("dy", "14")
     .attr("text-anchor", "start")
     .append("textPath")
     .attr("xlink:href",function(d) {return "#linkId_" + Math.floor((d.target.x + d.source.x) + (d.target.y + d.source.y));})
     .text(function(d) { 
        return "w: " + d.w; 
     });
  linktext.exit().remove();


  force.start();
}

function tick() {
  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  path.attr('d', function(d) {
    var deltaX = d.target.x - d.source.x,
        deltaY = d.target.y - d.source.y,
        dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
        normX = deltaX / dist,
        normY = deltaY / dist,
        sourcePadding = d.left ? 17 : 12,
        targetPadding = d.right ? 17 : 12,
        sourceX = d.source.x + (sourcePadding * normX),
        sourceY = d.source.y + (sourcePadding * normY),
        targetX = d.target.x - (targetPadding * normX),
        targetY = d.target.y - (targetPadding * normY);
    return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
  });
}


function addNode(){
  var val = d3.select('#addNodeV').property("value");
  if(graph.addNode(val)){
    updateGraph();
  }
}
function addEdge(){
  var from = d3.select('#addFrom').property("value");
  var to = d3.select('#addTo').property("value");
  var w = Number(d3.select('#addW').property("value"));
  var directed = d3.select('#directed').node().checked;
  if(from && to){
    graph.addEdge(from, to, w, directed);
    updateGraph();
  }
}
function rmNode(){
  var val = d3.select('#rmNodeV').property("value");
  if(val){
    graph.removeNode(val);
    updateGraph();
  }
}
function rmEdge(){
  var from = d3.select('#rmFrom').property("value");
  var to = d3.select('#rmTo').property("value");
  if(from && to){
    graph.removeEdge(from, to);
    updateGraph();
  }
}
function updateGraph(){
  //idMap is an object that stores id's as keys and the value as the position of that node in the nodes array
  var idMap = {};
  links = []; 
  nodes = [];
  //remove all nodes and links
  start();
  nodes = graph.nodes.map(function(el){
    return {id: el[0]}
  });
  //after checking with the the source add them again
  start();
  nodes.forEach(function(a){idMap[a.id] = a.index});
  graph.nodes.forEach(function(el){
    el[1].forEach(function(a){
      links.push({source: nodes[idMap[el[0]]], target: nodes[idMap[a[0]]], w: a[1]});
    })
  })
  //Finall start it again with the updated info
  start();
}


