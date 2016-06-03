(function() {

    $(document).ready(function() {

        var width = 700;
        var height = 400;
        var num = 3;
        var k = 1;

        var initialCircles = [
            { 'x': 175, 'y': 150, 'color': 'blue', 'lbl': 'Blue'},
            { 'x': 525, 'y': 150, 'color': 'red', 'lbl': 'Red'}];    

        svg = d3.select('#nnDiagram').append("svg");
        svg = svg
                .attr("width", width)
                .attr("height", height);

        var borderPath = svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", height)
            .attr("width", width)
            .style("stroke", 'black')
            .style("fill", "none")
            .style("stroke-width", 1);

        //Select all points
        var circles = svg.selectAll("circle")
            .data(initialCircles)
            .enter()
            .append("circle")
            .attr("class", "npoint")
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; })
            .attr("r", 4)
            .style("fill", function(d) { return d.color; });

        var labels = svg.selectAll("lbl")
            .data(initialCircles)
            .enter()         
            .append("text")
            .attr("class", "lbl")
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y - 6; })
            .text(function(d){
                return d.lbl;
            });

        // nnChart = nn().width(width).height(height);
        // var nnWrapper = d3.select("#nnDiagram")
        //       .call(nnChart);

        $('#btn1').on("click", function() {
            document.getElementById('part2').style.display = "inline";
            document.getElementById('part1').style.opacity = '.3';
            svg.append("circle")
                .attr("class", "npoint")
                .attr("id", 'newcircle')
                .attr("cx", 250)
                .attr("cy", 250)
                .attr("r", 4)
                .style("fill", 'white')
                .style("stroke", 'black');
            svg.append("text")
                .attr("class", "lbl")
                .attr('id', 'newlabel')
                .attr("x", 250)
                .attr("y", 250 - 6)
                .text('?');
        });

        $('#btn2').on('click', function() {
            document.getElementById('part3').style.display = "inline";
            document.getElementById('part2').style.opacity = '.3';
            document.getElementById('newcircle').style.fill = 'blue';
            document.getElementById('newcircle').style.stroke = 'none';
            document.getElementById('newlabel').innerHTML = 'Blue';
        });

        $('#btn3').on('click', function() {
            document.getElementById('part4').style.display = "inline";
            document.getElementById('part3').style.opacity = '.3';
            document.getElementById('newcircle').style.display = 'none';
            document.getElementById('newlabel').style.display = 'none';
            svg.append("line")
                .attr('x1', 350)
                .attr('y1', 0)
                .attr('x2', 350)
                .attr('y2', 400)
                .attr('stroke', 'gray')
                .attr('stroke-width', 3)
                .style("stroke-dasharray", ("3, 3"));

            svg.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("height", height)
                .attr("width", width / 2)
                .style("fill", "blue")
                .style("opacity", .1);

            svg.append("rect")
                .attr("x", width / 2)
                .attr("y", 0)
                .attr("height", height)
                .attr("width", width)
                .style("fill", "red")
                .style("opacity", .1);
        });

        //VORONOI INITIALIZATION
        var width = 700;
        var height = 400;
        var num = 5;
        var colors = ['rgb(255,0,0)', 'rgb(10,0,255)'];
        // var allColors = ['rgb(197,27,125)',
        //                 'rgb(127,188,65)',
        //                 'rgb(201,10,118)',
        //                 'rgb(230,245,100)',
        //                 'rgb(165,233,238)',
        //                 'rgb(214,245,129)',
        //                 'rgb(184,225,134)',
        //                 'rgb(222,119,174)',
        //                 'rgb(77,146,33)'];


        var allColors = ['rgb(197,27,125)',
                        'rgb(127,188,65)',
                        'rgb(201,10,118)',
                        'rgb(230,245,100)',
                        'rgb(165,233,238)',
                        'rgb(214,245,129)',
                        'rgb(184,225,134)',
                        'rgb(222,119,174)',
                        'rgb(255,182,193)',
                        'rgb(65,105,225)',
                        'rgb(176,196,222)',
                        'rgb(77,146,33)'];


        var vertices = d3.range(num).map(function(d) {
            return [Math.random() * width, Math.random() * height];
        });

        voronoiChart = Voronoi().width(width).height(height).rectColor(allColors).rectOpacity(0.5).circleSize(4);
        //.rectColor(['rgb(255,255,0)', 'rgb(0,255,0)']).rectOpacity(0.7);
        var voronoiWrapper = d3.select("#voronoiDiagram")
              .datum(vertices)
              .call(voronoiChart);

        $("#voronoiReshuffle").on("click", function() {
            vertices = d3.range(num).map(function(d) {
                return [Math.random() * width, Math.random() * height];
            });
            voronoiWrapper.datum(vertices).call(voronoiChart);
        });

        //Slider for circle size (https://jqueryui.com/slider/)
        $(function() {
            $("#voronoiCircleSizeSlider").slider({
                min: 2,
                max: 20,
                change: function(event, ui) {
                    voronoiChart.circleSize($(this).slider('values', 0));
                    voronoiWrapper.datum(vertices).call(voronoiChart);
                }
            });
        });

        //Slider for number of points (https://jqueryui.com/slider/)
        $(function() {
            $("#voronoiNumPointsSlider").slider({
                min: 3,
                max: 30,
                change: function(event, ui) {
                    num = $(this).slider('values', 0)
                    vertices = d3.range(num).map(function(d) {
                        return [Math.random() * width, Math.random() * height];
                    });
                    voronoiWrapper.datum(vertices).call(voronoiChart);
                }
            });
        });


        //END VORONOI INITIALIZAION

        //KNN INITIALIZATION
        var width = 700;
        var height = 400;
        var num = 10;
        var k = 3;
        var points = d3.range(num).map(function(d) {
            return [Math.random() * width, Math.random() * height];
        });

        knnChart = knn().width(width).height(height).k(k);
        var knnWrapper = d3.select("#knnDiagram")
              .datum(points)
              .call(knnChart);

        $("#knnReshuffle").on("click", function() {
            points = d3.range(num).map(function(d) {
                return [Math.random() * width, Math.random() * height];
            });
            knnWrapper.datum(points).call(knnChart);
        });

        //Slider for circle size (https://jqueryui.com/slider/)
        $(function() {
            $("#knnCircleSizeSlider").slider({
                min: 2,
                max: 15,
                change: function(event, ui) {
                    knnChart.circleSize($(this).slider('values', 0));
                    knnWrapper.datum(points).call(knnChart);
                }
            });
        });

        //Slider for number of points (https://jqueryui.com/slider/)
        $(function() {
            $("#knnNumPointsSlider").slider({
                min: 3,
                max: 200,
                change: function(event, ui) {
                    num = $(this).slider('values', 0)
                    points = d3.range(num).map(function(d) {
                        return [Math.random() * width, Math.random() * height];
                    });
                    knnWrapper.datum(points).call(knnChart);
                }
            });
        });

        //Slider for k value (https://jqueryui.com/slider/)
        $(function() {
            $("#knnKSlider").slider({
                min: 1,
                max: 25,
                change: function(event, ui) {
                    k = $(this).slider('values', 0);
                    knnChart.k(k);
                    knnWrapper.datum(points).call(knnChart);
                    $("#kvalue").html("" + k);
                }
            });
        });
        //END KNN INITIALIZATION


    });

    
})();