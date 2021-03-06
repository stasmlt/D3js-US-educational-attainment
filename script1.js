var   w = 1000,
      h =  500,
      circleWidth = 7; 
 

var palette = {
      "lightgreen": "#E5E8E8",
      "gray": "#708284",
      "mediumgray": "#536870",
      "blue": "#3B757F"
  }

var colors = d3.scale.category20();

var nodes = [
      { name: "EU Countries"},
      { name: "Belgium=732p", target: [0], value: 28 },
      { name: "Bulgaria=708p", target: [0], value: 28 },  
      { name: "France=2.878p", target: [0], value: 28 },
      { name: "Germany=3.459p", target: [0], value: 28 }, 
      { name: "Greece=793p", target: [0], value: 28 }, 
      { name: "Spain=1.689p", target: [0], value: 28 },
      { name: "Cyprus=57p", target: [0], value: 28 },
      { name: "Albania=28p", target: [0], value: 28 },
      { name: "Poland=2.938p", target: [0], value: 28 },
      { name: "UK=1.804p", target: [0], value: 28 },
      { name: "Portugal=624p", target: [0], value: 28 },
      { name: "Sweden=259p", target: [0], value: 28 },
      { name: "Finland=266p", target: [0], value: 28 },
      { name: "Austria=479p", target: [0], value: 28 },
      { name: "Norway=117p", target: [0], value: 28 },
      { name: "Malta=11p", target: [0], value: 28 },
      { name: "Croatia=44p", target: [0], value: 28 },
      { name: "Estonia=67p", target: [0], value: 28 },
];

var links = [];

for (var i = 0; i < nodes.length; i++){
      if (nodes[i].target !== undefined) { 
            for ( var x = 0; x < nodes[i].target.length; x++ ) 
              links.push({
                  source: nodes[i],
                  target: nodes[nodes[i].target[x]]  
              });
      };
};


var myChart = d3.select('body')
      .append("div")
        .classed("svg-container", true)
      
      .append('svg')
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 1000 450")
        .classed("svg-content-responsive", true)


var force = d3.layout.force()
      .nodes(nodes)
      .links([])
      .gravity(0.25)
      .charge(-600)
      .size([w,h]); 

      var link = myChart.selectAll('line') 
            .data(links).enter().append('line')
            .attr('stroke', palette.lightgreen)
            .attr('strokewidth', '1');

      var node =  myChart.selectAll('circle')  
            .data(nodes).enter() 
            .append('g') 
            .call(force.drag); 

     
     node.append('circle')
            .attr('cx', function(d){return d.x; })
            .attr('cy', function(d){return d.y; })
            .attr('r', function(d,i){
                  console.log(d.value);
                  if ( i > 0 ) {
                        return circleWidth + d.value; 
                  } else {
                        return circleWidth + 30; 
                  }
            })
            .attr('fill', function(d,i){
                  if ( i > 0 ) {
                        return colors(i);
                  } else {
                        return '#fff';
                  }
            })
            .attr('strokewidth', function(d,i){
                  if ( i > 0 ) {
                        return '0';
                  } else {
                        return '2';
                  }
            })
            .attr('stroke', function(d,i){
                  if ( i > 0 ) {
                        return '';
                  } else {
                        return 'black';
                  }
            });


      force.on('tick', function(e){ 
            node.attr('transform', function(d, i){
              return 'translate(' + d.x + ','+ d.y + ')'
            })

          link 
              .attr('x1', function(d){ return d.source.x; }) 
              .attr('y1', function(d){ return d.source.y; })
              .attr('x2', function(d){ return d.target.x; })
              .attr('y2', function(d){ return d.target.y; })
      });


      node.append('text')
            .text(function(d){ return d.name; })
            .attr('font-family', 'Raleway', 'Helvetica Neue, Helvetica')
            .attr('fill', function(d, i){
              console.log(d.value);
                  if ( i > 0 && d.value < 10 ) {
                        return palette.mediumgray;
                  } else if ( i > 0 && d.value >10 ) {
                        return palette.lightgreen;
                  } else {
                        return palette.blue;
                  }
            })
            .attr('text-anchor', function(d, i) {
                  return 'middle';
            })
            .attr('font-size', function(d, i){
                  if (i > 0) {
                        return '.6em';
                  } else {
                        return '.4em';    
                  }
            }) 

force.start();

