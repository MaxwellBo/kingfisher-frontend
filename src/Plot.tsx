import * as React from 'react';
import { withFauxDOM, ReactFauxDOM } from 'react-faux-dom';
import * as d3 from 'd3';
import {selectAll} from "d3-selection";

interface Props {
  data: Object;
}

interface State {
  data: Object;
}

class DataGenerator {
  allData: Object;

  constructor(allData: Object) {
    this.allData = allData;
  }

  getDataBySiteAndTime() {
    let sites:Array<string> = Object.keys(this.allData);
    let treeData:Array<Object> = [];
    for(let i:number=0; i<sites.length; i++) {
      let times:Array<string> = Object.keys(this.allData[sites[i]]['measurements']);
      for(let j:number=0; j<times.length; j++) {
        treeData.push({
          site: sites[i],
          time: times[j],
          data: this.allData[sites[i]]['measurements'][times[j]]['trees'],
          siteAndTime: sites[i] + " " + times[j]
        });
      }
    }
    return treeData;
  }

  getAllDataAsArray() {
    let sites = Object.keys(this.allData);
    let allData:Array<Object> = [];
    for(let i=0; i<sites.length; i++) {
      let site = sites[i];
      let dataAtSite = this.allData[site];
      let latitude = dataAtSite['latitude'];
      let longitude = dataAtSite['longitude']
      let measurements = dataAtSite['measurements'];
      let times = Object.keys(measurements);
      for(let j=0; j<times.length; j++) {
        let time = times[j];
        let trees = measurements[time]['trees'];
        let treeIds = Object.keys(trees);
        for(let k=0; k<treeIds.length; k++) {
          let tree = trees[treeIds[k]];
          let height = tree['height'];
          let species = tree['species'];
          let dbhs = tree['dbhs'];
          for(let m=0; m<dbhs.length; m++) {
            allData.push(
              {
                site: site,
                latitude: latitude,
                longitude: longitude,
                time: time,
                height: height,
                species: species,
                dbhs: dbhs[m],
                allDbhs: dbhs,
                siteAndTime: site + time,
                treeId: treeIds[k]
              }
            )
          }
        }
      }
    }
    return allData;
  }

  /**
   *
   * @param {Object} singleSiteAndDateObject
   * An object full of objects containing height, dbhs (as array) and species
   */
  getHeightValues(singleSiteAndDateObject:Object) {
    let objectIndices = Object.keys(singleSiteAndDateObject);
    let heightValues:Array<number> = [];
    for(let i:number=0; i<objectIndices.length; i++) {
      heightValues.push(parseInt(singleSiteAndDateObject[objectIndices[i]]['height']));
    }
    return heightValues;
  }

  getMaximumHeightValue() {
    let dataBySiteAndTime = this.getDataBySiteAndTime();
    let allHeights:Array<number> = [];
    for(let i:number=0; i<dataBySiteAndTime.length; i++) {
      allHeights = allHeights.concat(this.getHeightValues(dataBySiteAndTime[i]['data']));
    }

    let largestHeight = 0;
    for(let i:number=0; i<allHeights.length; i++) {
      largestHeight < allHeights[i] ? largestHeight = allHeights[i] : 0;
    }

    return largestHeight;
  }

  getFiveNumberSummaryFromArray(values:Array<number>) {
    var ss = require('summary-statistics');
    var summary = ss(values);
    return summary;
  }

  seperateAllDataAsArrayBySiteAndTime(values: Array<Object>) {
    let tmp = {}
    for(let i=0; i<values.length; i++) {
      let dataPoint = values[i];
      let siteAndTime = dataPoint['siteAndTime'];
      if(tmp[siteAndTime]) {
        tmp[siteAndTime]['data'].push(dataPoint);
      } else {
        tmp[siteAndTime] = {data:[dataPoint]}
      }
    }
    let data:Array<Array<Object>> = [];
    let siteAndTimes = Object.keys(tmp);
    for(let i=0; i<siteAndTimes.length; i++) {
      data.push(tmp[siteAndTimes[i]]['data']);
    }
    return data;
  }

  getBoxPlotInfoForArray(key:string, data:Array<Object>) {
    // Remove duplicate treeIds TODO just for height
    let seenKeys:Object = {};
    let uniqueValues:Array<number> = [];
    for(let i=0; i<data.length; i++) {
      if(seenKeys[data[i]['treeId']]) {
        continue;
      }
      seenKeys[data[i]['treeId']] = 1;
      uniqueValues.push(data[i]['height']);
    }
    let fiveNumberSummary = this.getFiveNumberSummaryFromArray(uniqueValues);
    let IQR = fiveNumberSummary['q3'] - fiveNumberSummary['q1'];
    let theoreticalLowerBound = fiveNumberSummary['median'] - (IQR * 1.5);
    let theoreticalUpperBound = fiveNumberSummary['median'] + (IQR * 1.5);

    let outliers:Array<number> = [];
    let boxValues:Array<number> = []
    uniqueValues.sort();
    for(let i=0; i<uniqueValues.length; i++) {
      if(uniqueValues[i] < theoreticalLowerBound || uniqueValues[i] > theoreticalUpperBound) {
        outliers.push(uniqueValues[i]);
      } else {
        boxValues.push(uniqueValues[i]);
      }
    }
    fiveNumberSummary['outliers'] = outliers;
    fiveNumberSummary['bottomWhisker'] = boxValues[0];
    fiveNumberSummary['topWhisker'] = boxValues[boxValues.length - 1];
    fiveNumberSummary['siteAndTime'] = data[0]['siteAndTime'];
    return fiveNumberSummary;
  }
}

class Plot extends React.Component<Props, State> {
  private node: HTMLDivElement | null;

  constructor(props: Props) {
    super(props);

    this.state = {
      data: this.props.data
    };

    this.createPlot = this.createPlot.bind(this);
  }

  componentDidMount() {
    this.createPlot();
  }

  componentDidUpdate() {
    this.createPlot();
  }

  shouldComponentUpdate() {
    return false;
  }

  /**
   * NOTE: This operates within a DOM that is controlled via d3, not React. Therefore, the code contained will use d3
   * idioms.
   *
   */
  createPlot() {
    // Organize data
    let dataGenerator:DataGenerator = new DataGenerator(this.state.data);
    let data:Array<Object> = dataGenerator.getAllDataAsArray();

    let siteAndTimesAsObject:Object = {};
    for(let key in data) {
      if(data.hasOwnProperty(key)) {
        siteAndTimesAsObject[data[key]['siteAndTime']] = 1;
      }
    }

    console.log(siteAndTimesAsObject);

    let siteAndTimes = [""];
    siteAndTimes = siteAndTimes.concat(Object.keys(siteAndTimesAsObject));
    siteAndTimes.push(" ");

    let seperatedData = dataGenerator.seperateAllDataAsArrayBySiteAndTime(data);
    let boxData:Array<Object> = []
    for(let i=0; i<seperatedData.length; i++) {
      boxData.push(dataGenerator.getBoxPlotInfoForArray('height', seperatedData[i]));
    }

    // Begin plotting
    let yMax:number = dataGenerator.getMaximumHeightValue();
    let xMax:number = data.length;

    let padding:number = 100;

    let height:number = 700;
    let width:number = 700;

    const node = this.node;

    // Build component to place entire graph in
    let svg = d3.select(node)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g');

    // Build mappings
    let xScale = d3.scale.ordinal()
      .domain(siteAndTimes)
      .rangePoints([padding, width - padding]);

    let yScale = d3.scale.linear()
      .domain([200, yMax])
      .range([height - padding, padding]);

    // Build axis
    let yAxis = d3.svg.axis()
      .orient("left")
      .scale(yScale);

    let xAxis = d3.svg.axis()
      .orient("bottom")
      .scale(xScale);

    console.log(boxData);

    let xMap = (dataPoint) => xScale(dataPoint['siteAndTime']);
    let x1Map = (dataPoint) => xScale(dataPoint['siteAndTime']) - 25;
    let x2Map = (dataPoint) => xScale(dataPoint['siteAndTime']) + 25;
    let yMap = (dataPoint) => yScale(dataPoint['height']);
    let yLow = (dataPoint) => yScale(dataPoint['q3']);
    let yMedian = (dataPoint) => yScale(dataPoint['median']);
    let yHeight = (dataPoint) => yScale(dataPoint['q1']) - yScale(dataPoint['q3']);
    let yq3 = (dataPoint) => yScale(dataPoint['q3']);
    let yTopWhisker = (dataPoint) => yScale(dataPoint['topWhisker'])
    let yq1 = (dataPoint) => yScale(dataPoint['q1']);
    let yBottomWhisker = (dataPoint) => yScale(dataPoint['bottomWhisker'])


    // Create a group for every data point
    let boxElements = svg.selectAll("g")
      .data(boxData)
      .enter()
      .append("g")
      .attr("class", "boxPlot")

    boxElements.append("rect")
      .attr("x", xMap)
      .attr("y", yLow)
      .attr("width", 50)
      .attr("height", yHeight)
      .attr("transform", "translate(-25, 0)")
      .style("fill", "blue")

    boxElements.append("line")
      .attr("x1", x1Map)
      .attr("x2", x2Map)
      .attr("y1", yMedian)
      .attr("y2", yMedian)
      .style("stroke", "black")
      .style("stroke-width", "2")

    boxElements.append("line")
      .attr("x1", xMap)
      .attr("x2", xMap)
      .attr("y1", yq3)
      .attr("y2", yTopWhisker)
      .style("stroke", "black")
      .style("stroke-width", "2")

    boxElements.append("line")
      .attr("x1", x1Map)
      .attr("x2", x2Map)
      .attr("y1", yTopWhisker)
      .attr("y2", yTopWhisker)
      .style("stroke", "black")
      .style("stroke-width", "2")

    boxElements.append("line")
      .attr("x1", xMap)
      .attr("x2", xMap)
      .attr("y1", yq1)
      .attr("y2", yBottomWhisker)
      .style("stroke", "black")
      .style("stroke-width", "2")

    boxElements.append("line")
      .attr("x1", x1Map)
      .attr("x2", x2Map)
      .attr("y1", yBottomWhisker)
      .attr("y2", yBottomWhisker)
      .style("stroke", "black")
      .style("stroke-width", "2")

    xMap = (dataPoint) => xScale(dataPoint['siteAndTime']);
    yMap = (dataPoint) => yScale(dataPoint['height']);

    // draw y axis with labels and move in from the size by the amount of padding
    svg.append("g")
      .attr("transform", "translate("+padding+"," + 0 + ")")
      .call(yAxis);

    // draw x axis with labels and move to the bottom of the chart area
    svg.append("g")
      .attr("class", "xaxis")   // give it a class so it can be used to select only xaxis labels  below
      .attr("transform", "translate("+ 0 +"," + (height - padding) + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(20), translate(0, 20)")
      .style("text-anchor", "start");

    // Creates a tooltip to use within the svg component (it's just a div that floats around)
    let tooltip = d3.select(node)
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .text("a simple tooltip")
      .style("white-space", "pre")
      .style("background", "rgba(76, 175, 80, 0.9)")
      .style("padding", "5px")
      .style("border-radius", "25px")

    // Create a group for every data point
    let dataElements = svg.selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "shot")

    // Attach a circle to every data point
    dataElements.append("circle")
      .attr("r", 3)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .attr("treeName", (dataPoint) => dataPoint)
      .on("mouseover", function(dataPoint, index, array){
        d3.select(array[index]).style("fill", "green").attr("r", 5)
        tooltip.style("visibility", "visible")
        tooltip.text("Height: " + dataPoint['height'] +
          "\n Tree type: " + dataPoint['species'] +
          "\n Dbhs: " + dataPoint['allDbhs'] +
          "\n Latitude: " + dataPoint['latitude'] +
          "\n Longitude: " + dataPoint['longitude'])})
      .on("mouseout", function(dataPoint, index, array) {
        d3.select(array[index]).style("fill", "black").attr("r", 3.5)
        tooltip.style("visibility", "hidden")})
      .on("mousemove", function(){return tooltip.style("top",
        (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
  }

  render() {
    return (
      <div ref={node => this.node = node}>
      </div>
    );
  }
}

export default Plot;