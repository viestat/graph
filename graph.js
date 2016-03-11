var Graph = function(){
  this.nodes = [];
}

Graph.prototype.addNode = function(val){
  var exists = false;
  this.nodes.forEach(function(el){
    if(el[0] === val){
      exists = true;
    }
  });
  if(!exists){
    this.nodes.push([val,[]]);
  }
}


Graph.prototype.removeNode = function(val){
  var j;
  var k;
  this.nodes.forEach(function(el, i){
    if(el[0] === val){
      j = i;
    } else {
      el[1].forEach(function(edge, ind){
        if(edge[0] === val){
          k = ind;
        }
      });
      el[1].splice(k,1);
    }
  });
  this.nodes.splice(j,1);
}

Graph.prototype.addEdge = function(node1, node2, w, directed){
  directed = directed || false;
  w = w || 1;
  this.nodes.forEach(function(el){
    if(el[0] === node1){
      el[1].push([node2, w]);
    }
    if(!directed){
      if(el[0] === node2){
        el[1].push([node1, w]);
      }
    }
  });
}
//[val,[[edge, w]...]]
