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




var link = svg.selectAll(".link");

  
function start() {
  force.nodes(nodes);
  force.links(links);
  link = link.data(force.links(), function(d) { return d.source.id + "-" + d.target.id; });
  link.enter().insert("line", ".node").attr("class", "link");
  link.exit().remove();

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

  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
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


