// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements

const generateLayout = (positiveWords, elementWidth, elementHeight) => {
    return new Promise((resolve) => {
        const myWords = []
        console.log(positiveWords)
        positiveWords.forEach((w) => {
            let isExist = false
            for(let word of myWords)
            {   // if duplicate word found then increase its frequency
                if( word.word == w.word ) {
                     word.freq += 1
                    isExist = true
                }
            } 
            // if new word then add into myWords array 
            if( !isExist ){
                const data = {
                    word: w.word,
                    score: w.score,
                    freq: 1
                }
                myWords.push(data)
            }
        })

        // copied and modified from: 
        // https://d3-graph-gallery.com/wordcloud.html
        // set the dimensions and margins of the graph
        const margin = {top: 10, right: 10, bottom: 10, left: 10},
            width = elementWidth - margin.left - margin.right,
            height = elementHeight - margin.top - margin.bottom;

        // copied and modified from: 
        // https://d3-graph-gallery.com/wordcloud.html
        // append the svg object to the body of the page
        d3.select("#wordCloud").selectAll("svg").remove()
        const svg = d3.select("#wordCloud").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // copied and modified from: 
        // https://d3-graph-gallery.com/wordcloud.html
        const draw = (words) => {
            svg
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
                .data(words)
            .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("fill", () => {
                    const color = ['#fc5e02', '#fa9e03', '#fddb6d', '#1cbfd8', '#1d7ed4', '#f1c40f', '#8e44ad', '2ecc71', '3498db']
                    return color[~~(Math.random() * 9)]
                })
                .style("font-family", "Comic Sans MS, Comic Sans, cursive")
                .style("font-weight", `${900}`)
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text((d) => { return d.text; });
        }

        // copied and modified from: 
        // https://d3-graph-gallery.com/wordcloud.html
        const layout = d3.layout.cloud()
        .size([width, height])
        .words(myWords.map(function(d) {return {text: d.word, size: d.score * d.freq * 15}; }))
        .padding(10)
        .rotate(0)
        .fontSize((d) => { return d.size })
        .on("end", draw);
        layout.start();
        resolve();
    })
}

export { generateLayout }