# Graphs!

### About:
This is a graph visualisation  that uses d3's force layout.

It has a Graph implementation that has some of the most common methods in a graph such as:

* Add/Remove Node
* Add/remove Edge
* Get Node
* Get Edges

The Structure of this graph is the following:

* The nodes property is an array
* Each node is an array of two elements where: `["value", [edges...]]` 
  * The edges of a node are inside the second element of the node array
* Each edge is an array of two elements where `["value of other node", weight]`
  * weight defaults to 1




### Demo: 
![alt text](https://github.com/viestat/graph/blob/master/graphs.gif?raw=true = 250x "Demo")
