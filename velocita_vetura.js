//chart per la velocita della vettura




window.Apex = {
  chart: {
    foreColor: "#fff",
    toolbar: {
      show: false
    }
  },
  colors: ["#FCCF31", "#17ead9", "#f02fc2"],
  stroke: {
    width: 3
  },
  dataLabels: {
    enabled: false
  },
  grid: {
    borderColor: "#40475D"
  },
  xaxis: {
    axisTicks: {
      color: "#333"
    },
    axisBorder: {
      color: "#333"
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      gradientToColors: ["#F55555", "#6078ea", "#6094ea"]
    }
  },
  tooltip: {
    theme: "dark",
    x: {
      formatter: function (val) {
        return moment(new Date(val)).format("HH:mm:ss");
      }
    }
  },
  yaxis: {
    decimalsInFloat: 2,
    opposite: true,
    labels: {
      offsetX: -10
    }
  }
};

var trigoStrength = 3;
var iteration = 11;

function getRandom() {
  var i = iteration;
  return (
    (Math.sin(i / trigoStrength) * (i / trigoStrength) +
      i / trigoStrength +
      1) *
    (trigoStrength * 2)
  );
}

function generateMinuteWiseTimeSeries(baseval, count) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    var y =
      (Math.sin(i / trigoStrength) * (i / trigoStrength) +
        i / trigoStrength +
        1) *
      (trigoStrength * 2);

    series.push([x, y]);
    baseval += 300000;
    i++;
  }
  return series;
}

var optionsLine = {
  chart: {
    height: 350,
    type: "line",
    stacked: true,
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimation: {
        speed: 1000
      }
    },
    dropShadow: {
      enabled: true,
      opacity: 0.3,
      blur: 5,
      left: -7,
      top: 22
    },
    events: {
      animationEnd: function (chartCtx) {
        const newData1 = chartCtx.w.config.series[0].data.slice();
        newData1.shift();
        window.setTimeout(function () {
          chartCtx.updateOptions(
            {
              series: [
                {
                  data: newData1
                }
              ],
            },
            false,
            false
          );
        }, 300);
      }
    },
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: "straight",
    width: 5
  },
  grid: {
    padding: {
      left: 0,
      right: 0
    }
  },
  markers: {
    size: 0,
    hover: {
      size: 0
    }
  },
  series: [
    {
      name: "velocita",
      data: generateMinuteWiseTimeSeries(
        new Date("12/12/2016 00:20:00").getTime(),
        12,
        {
          min: 30,
          max: 110
        }
      )
    }
  ],
  xaxis: {
    categories : [1,2,3,4,5,6],
    tickAmount: 'datapoints',
    range: 2700000
  },
  title: {
    text: "velocita Vettura",
    align: "left",
    style: {
      fontSize: "12px"
    }
  },
  subtitle: {
    text: "Kh",
    floating: true,
    align: "right",
    offsetY: 0,
    style: {
      fontSize: "22px"
    }
  },
  legend: {
    show: true,
    floating: true,
    horizontalAlign: "left",
    onItemClick: {
      toggleDataSeries: false
    },
    position: "top",
    offsetY: -33,
    offsetX: 60
  }
};

var chartLine = new ApexCharts(
  document.querySelector("#linechart"),
  optionsLine
);
chartLine.render();

window.setInterval(function () {
  iteration++;

  chartLine.updateSeries([
    {
      data: [
        ...chartLine.w.config.series[0].data,
        [chartLine.w.globals.maxX + 300000, getRandom()]
      ]
    }
  ]);
}, 1000);