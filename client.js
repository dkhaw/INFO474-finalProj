(function() {

    $(document).ready(function() {


        //VORONOI INITIALIZATION
        var width = 700;
        var height = 400;
        var num = 3;
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


        var vertices = d3.range(3).map(function(d) {
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
        var num = 3;
        var k = 1;
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