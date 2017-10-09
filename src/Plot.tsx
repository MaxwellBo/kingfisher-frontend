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
    dataGenerator.getMaximumHeightValue();

    const node = this.node;

    // Build housing component
    let svg = d3.select(node)
      .append('svg')
      .attr('width', 300)
      .attr('height', 300)
      .append('g');


  }

  render() {
    return (
      <div ref={node => this.node = node}>
      </div>
    );
  }
}

export default Plot;