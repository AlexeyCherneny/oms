import React from "react";
import { isNil } from "lodash";

import { PieChart, Pie, Cell, Sector } from "recharts";

const colors = [
  "#001f3f",
  "#0074D9",
  "#7FDBFF",
  "#39CCCC",
  "#3D9970",
  "#2ECC40",
  "#01FF70",
  "#FFDC00",
  "#FF851B",
  "#FF4136",
  "#85144b",
  "#F012BE",
  "#B10DC9"
];

const renderActiveShape = props => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload
  } = props;

  const sectorIndicatorHeight = 4;
  const sectorIndicatorPadding = 6;

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>

      <Sector
        style={{ opacity: 0.8, cursor: "pointer" }}
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />

      <Sector
        style={{ opacity: 0.8, cursor: "pointer" }}
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + sectorIndicatorPadding}
        outerRadius={
          outerRadius + sectorIndicatorPadding + sectorIndicatorHeight
        }
        fill={fill}
      />
    </g>
  );
};

class PieChartComponent extends React.Component {
  state = {
    activeIndex: 0,
    blockedIndex: null
  };

  onPieEnter = (_, index) => this.setState({ activeIndex: index });

  onPieClick = (_, index) => this.setState({ blockedIndex: index });

  pieChartSettings = {
    width: 300,
    height: 300
  };

  pieSettings = {
    cx: 130,
    cy: 130,
    innerRadius: 90,
    outerRadius: 120
  };

  render() {
    const { activeIndex, blockedIndex } = this.state;
    const { pieChartData } = this.props;

    const pieIndex = isNil(blockedIndex) ? activeIndex : blockedIndex;

    return (
      <PieChart {...this.pieChartSettings} {...this.props.pieChartSettings}>
        <Pie
          {...this.pieSettings}
          style={{ cursor: "pointer" }}
          data={pieChartData}
          activeIndex={pieIndex}
          activeShape={renderActiveShape}
          onMouseEnter={this.onPieEnter}
          onClick={this.onPieClick}
        >
          {pieChartData &&
            pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
        </Pie>
      </PieChart>
    );
  }
}

export default PieChartComponent;
