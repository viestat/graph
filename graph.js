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
  return !exists;
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
  var edges1 = this.getEdges(node1);
  var edges2 = this.getEdges(node2);
  var found = false;
  directed = directed || false;
  w = w || 1;
  this.nodes.forEach(function(el,i){
    if(el[0] === node1){
      edges1.forEach(function(edge,j){
        if(edge[0] === node2){
          this.nodes[i][1][j] = [node2, w];
          found = true;
        }
      },this)
      if(!found){
        el[1].push([node2, w]);
      }
    }
  },this);
  if(!directed){
    this.addEdge(node2,node1,w, true);
  }
}

Graph.prototype.removeEdge = function(node1, node2){

  this.nodes.forEach(function(el){
    if(el[0] === node1){
      el[1].forEach(function(edge, i){
        if(edge[0] === node2){
          el[1].splice(i,1);
        }
      });
    }
  });
}

Graph.prototype.getEdges = function(node){
  var res = null;
  this.nodes.forEach(function(el){
    if(el[0] === node){
      res = el[1];
    }
  });
  return res;
}



//[val,[[edge, w]...]]
