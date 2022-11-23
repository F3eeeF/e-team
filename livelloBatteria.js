
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

function getRangeRandom(yrange) {
  return Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
}


var optionsProgress2 = {
  chart: {
    height: 70,
    type: "bar",
    stacked: true,
    sparkline: {
      enabled: true
    }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "20%",
      colors: {
        backgroundBarColors: ["#40475D"]
      }
    }
  },
  colors: ["#17ead9"],
  stroke: {
    width: 0
  },
  series: [
    {
      name: "livello batteria",
      data: [80]
    }
  ],
  title: {
    floating: true,
    offsetX: -10,
    offsetY: 5,
    text: "livello batteria"
  },
  subtitle: {
    floating: true,
    align: "right",
    offsetY: 0,
    text: "80%",
    style: {
      fontSize: "20px"
    }
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    categories: ["livello batteria"]
  },
  yaxis: {
    max: 100
  },
  fill: {
    type: "gradient",
    gradient: {
      inverseColors: false,
      gradientToColors: ["#6078ea"]
    }
  }
};

var chartProgress2 = new ApexCharts(
  document.querySelector("#progress2"),
  optionsProgress2
);
chartProgress2.render();


window.setInterval(function () {
  iteration++;


  var p2Data = getRangeRandom({ min: 10, max: 100 });
  chartProgress2.updateOptions({
    series: [
      {
        data: [p2Data]
      }
    ],
    subtitle: {
      text: p2Data + "%"
    }
  });
}, 2000);