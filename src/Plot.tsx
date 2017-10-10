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
    let yMax:number = dataGenerator.getMaximumHeightValue();
    let xMax:number = data.length;

    let padding:number = 40;

    let divHeight:number = 500;
    let divWidth:number = 500;

    let height:number = 500;
    let width:number = 500;

    const node = this.node;

    // Build component to place entire graph in
    let svg = d3.select(node)
      .append('svg')
      .attr('width', divWidth)
      .attr('height', divHeight)
      .append('g');

    // Setup functions to map from a range to the dimensions of the graph
    let xScale = d3.scale.linear()
      .domain([0, xMax])
      .range([padding, divWidth - padding]);
    let yScale = d3.scale.linear()
      .domain([0, yMax])
      .range([divHeight - padding, padding]);

    // Build axis
    let yAxis = d3.svg.axis()
      .orient("left")
      .scale(yScale);

    let xAxis = d3.svg.axis()
      .orient("bottom")
      .scale(xScale);

    // draw y axis with labels and move in from the size by the amount of padding
    svg.append("g")
      .attr("transform", "translate("+padding+"," + 0 + ")")
      .call(yAxis);

    // draw x axis with labels and move to the bottom of the chart area
    svg.append("g")
      .attr("class", "xaxis")   // give it a class so it can be used to select only xaxis labels  below
      .attr("transform", "translate("+ 0 +"," + (height - padding) + ")")
      .call(xAxis);

    let dataKeys = Object.keys(data);
    for(let i=0; i<dataKeys.length; i++) {
      let heightVals = dataGenerator.getHeightValues(data[dataKeys[i]]['data']);

    }

    console.log(data);
  }

  render() {
    return (
      <div ref={node => this.node = node}>
      </div>
    );
  }
}

export default Plot;