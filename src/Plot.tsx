import * as React from 'react';
import { withFauxDOM, ReactFauxDOM } from 'react-faux-dom';
import * as d3 from 'd3';

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
          data: this.allData[sites[i]]['measurements'][times[j]]['trees']
        });
      }
    }
    return treeData;
  }

  /**
   *
   * @param {Object} treeValue
   * An object full of objects containing height, dbhs (as array) and species
   */
  getHeightValues(treeValue:Object) {
    let objectIndices = Object.keys(treeValue);
    let heightValues:Array<number> = [];
    for(let i:number=0; i<objectIndices.length; i++) {
      heightValues.push(parseInt(treeValue[objectIndices[i]]['height']));
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
    let dataGenerator:DataGenerator = new DataGenerator(this.state.data);
    let data:Array<Object> = dataGenerator.getDataBySiteAndTime();
    let xMax:number = dataGenerator.getMaximumHeightValue();
    let yMax:number = data.length;
    let height:number = 300;
    let width:number = 300;

    const node = this.node;

    // Build housing component
    let svg = d3.select(node)
      .append('svg')
      .attr('width', 300)
      .attr('height', 300)
      .append('g');

    let xScale = d3.scaleLinear()
      .domain([0, xMax])
      .range([0, width]);
    let yScale = d3.scaleLinear()
      .domain([0, yMax])
      .range([height, 0]);

    let xAxis = d3.axisBottom()
      .scale(xScale)
    let yAxis = d3.axisLeft()
      .scale(yScale)

    let xMap = (dataPoint) => xScale(dataPoint[0]);
    let yMap = (dataPoint) => yScale(dataPoint[1]);

    // Create and render x-axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height) + ")")
      .call(xAxis)

    // Create and render y-axis
    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + 0 + ", 0)")
      .call(yAxis)
  }

  render() {
    return (
      <div ref={node => this.node = node}>
      </div>
    );
  }
}

export default Plot;