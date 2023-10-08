import React, { useEffect, useRef } from "react";
import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto";
import * as d3 from "d3";
import { pie, arc } from "d3-shape";
import { scaleOrdinal } from "d3-scale";


function HomePage() {

  var dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#F0F8FF',
          '#FFFACD',
          '#B22222'
        ],
      },
    ],
    labels: [],
  };

  function createChart() {
    var ctx = document.getElementById("myChart").getContext("2d");
    var myPieChart = new ChartJS(ctx, {
      type: "pie",
      data: dataSource,
    });
  }
  

  function getBudget() {
    axios.get("/budget.json").then(function (res) {
      for (var i = 0; i < res.data.myBudget.length; i++) {
        dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
        dataSource.labels[i] = res.data.myBudget[i].title;
      }
      createChart();
      createD3Chart(res.data.myBudget); // Pass the budget data to createD3Chart
    }).catch(function (error) {
      console.error("Error fetching budget data: ", error);
    });
  }

  function randomData(budgetData) {
    return budgetData.map(function (data) {
      return { label: data.title, value: data.budget };
    });
  }

  const svgRef = useRef(null);

  function createD3Chart(data) {
    const svg = d3.select(svgRef.current);

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    const innerRadius = radius * 0.6; // Set the inner radius to create a hollow center

    svg.attr("width", width).attr("height", height);

    const color = d3
        .scaleOrdinal()
        .domain(data.map((d) => d.title))
        .range([
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#F0F8FF',
          '#FFFACD',
          '#B22222'
        ]);

    const pieGenerator = d3.pie().value((d) => d.budget);

    const arcs = pieGenerator(data);

    const arcGenerator = d3.arc()
        .innerRadius(innerRadius) // Use the innerRadius to create a hollow center
        .outerRadius(radius);

    const outerArc = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

    const g = svg
        .selectAll(".arc")
        .data(arcs)
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    g.append("path")
        .attr("d", arcGenerator)
        .style("fill", (d) => color(d.data.title));

    g.append("text")
        .attr("transform", (d) => `translate(${arcGenerator.centroid(d)})`)
        .attr("dy", "0.35em")
        .style("text-anchor", "middle")
        .text((d) => d.data.title);
}
  
  useEffect(() => {
    console.log("useEffect.!");
    getBudget();
  }, []);
  
  return (
    <main className="center" id="main">
      <div className="container center">
        <article className="page-area">
        <div className="col">
                    <section>
                        <div className="text-box card">
                            <h1>Stay on track</h1>
                            <article>
                                <p className="para">
                                    Do you know where you are spending your money? If you really stop to track it down,
                                    you would get surprised! Proper budget management depends on real data... and this
                                    app will help you with that!
                                </p>
                            </article>
                        </div>
                    </section>
                </div>
                <div className="col">
                    <section>
                        <div className="text-box card">
                            <h1>Alerts</h1>
                            <article>
                                <p className="para">
                                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                                </p>
                            </article>
                        </div>
                    </section>
                </div>
                <div className="col">
                    <section>
                        <div className="text-box card">
                            <h1>Results</h1>
                            <article>
                                <p className="para">
                                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                                    Also, they to live happier lives... since they expend without guilt or fear... 
                                    because they know it is all good and accounted for.
                                </p>
                            </article>
                        </div>
                    </section>
                </div>
                <div className="col">
                    <section>
                        <div className="text-box card">
                            <h1>Free</h1>
                            <article>
                                <p className="para">
                                    This app is free!!! And you are the only one holding your data!
                                </p>
                            </article>
                        </div>
                    </section>
                </div>
                <div className="col">
                    <section>
                        <div className="text-box card">
                            <h1>Stay on track</h1>
                            <article>
                                <p className="para">
                                    Do you know where you are spending your money? If you really stop to track it down,
                                    you would get surprised! Proper budget management depends on real data... and this
                                    app will help you with that!
                                </p>
                            </article>
                        </div>
                    </section>
                </div>
                <div className="col">
                    <section>        
                        <div className="text-box card">
                            <h1>Alerts</h1>
                            <article>
                                <p className="para">
                                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                                </p>
                            </article>
                        </div>
                    </section>
                </div>
                <div className="col">
                    <section>
                        <div className="text-box card">
                            <h1>Results</h1>
                                <article>
                                <p className="para">
                                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                                    Also, they to live happier lives... since they expend without guilt or fear... 
                                    because they know it is all good and accounted for.
                                </p>
                            </article>
                        </div>
                    </section>
                </div>
        <div className="col">      
            <section>
            <div className="charts">
              <h2>Chart</h2>
              <p>
                <canvas id="myChart" ></canvas>
              </p>
            </div>
          </section>
        </div>

        <div className="col">  
          <section>
            <div className="charts">
              <h2>D3js Chart</h2>
              <p>
                  <svg id="d3-chart" ref={svgRef} style={{ height: 400, width: 450 }}></svg>
              </p>
            </div>
          </section>
        </div>

        </article>
      </div>
    </main>
  );
}

export default HomePage;