'use client'
import {Card} from "@radix-ui/themes";
import {ResponsiveContainer, BarChart, XAxis, YAxis, Bar} from "recharts";

interface Props {
  notStarted: number;
  inProgress: number;
  closed: number;
}

function IssueChart({notStarted, inProgress, closed}: Props) {
  const data = [
    {label: "Not Started", value: notStarted},
    {label: "In Progress", value: inProgress},
    {label: "Closed", value: closed}
  ]
  return <Card>
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart data={data}>
        <XAxis dataKey={"label"}/>
        <YAxis/>
        <Bar barSize={60} dataKey={"value"} style={{fill: 'var(--accent-9)'}}/>
      </BarChart>
    
    </ResponsiveContainer>
  </Card>;
}

export default IssueChart;
