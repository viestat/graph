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
    .charge(-400)
    .linkDistance(120)
    .size([width, height])
    .on("tick", tick);

var node = svg.selectAll(".node")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node")
      .call(force.drag);




var path = svg.append('svg:g').selectAll('path');

  
function start() {
  force.nodes(nodes);
  force.links(links);
  path = path.data(force.links());
  path.enter().append('svg:path')
    .attr('class', 'link')
    .style('marker-end','url(#end-arrow)')
  path.exit().remove();

  node = node.data(force.nodes(), function(d) { return d.id;});
  node.enter().append("g").attr("class", function(d) { return "node " + d.id; }).call(force.drag);
  node.append("circle")
      .attr("r", 8)

  node.append("text")
    .attr("dx", 12)
    .attr("dy", ".35em")
    .text(function(d) { return d.id });

  node.exit().remove();

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
  var lik = {};
  nodes = graph.nodes.map(function(el){
    return {id: el[0]}
  });
  start();
  nodes.forEach(function(a){lik[a.id] = a.index});
  console.log(lik);
  links = graph.nodes.map(function(el){
    return el[1].map(function(a){
      return {source: nodes[lik[el[0]]], target: nodes[lik[a[0]]]}
    })
  })
  .filter(function(b){
    return b.length
  })
  .map(function(a){
    return a[0]
  });
  start();
}


