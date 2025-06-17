"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

import type { Payload } from "recharts/types/component/DefaultLegendContent";

export interface ModelData {
  model: string;
  pass1_build: number | string;
  pass1_test: number | string;
  compiler_repair_build: number | string;
  compiler_repair_test: number | string;
  test_repair_build: number | string;
  test_repair_test: number | string;
  is_adapted?: boolean;
  link?: string;
}

interface LeaderboardProps {
  scoresData: ModelData[];
}

export default function Leaderboard({ scoresData }: LeaderboardProps) {
  return (
    <div className="flex flex-col items-stretch p-4 space-y-6">
      <div className="text-center text-sm text-muted-foreground mt-2">
      Comparison of test success rates across different repair strategies.
      </div>
      <TestResultsBarChart data={scoresData} />
      <TableComponent data={scoresData} />
    </div>
  );
}

interface TableComponentProps {
  data: ModelData[];
}

const TableComponent: React.FC<TableComponentProps> = ({ data }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead rowSpan={2} className="align-bottom">Model</TableHead>
        <TableHead colSpan={2} className="text-center border-b">Pass@1</TableHead>
        <TableHead colSpan={2} className="text-center border-b">Compiler repair</TableHead>
        <TableHead colSpan={2} className="text-center border-b">Test repair</TableHead>
      </TableRow>
      <TableRow>
        <TableHead className="text-center">Build</TableHead>
        <TableHead className="text-center">Test</TableHead>
        <TableHead className="text-center">Build</TableHead>
        <TableHead className="text-center">Test</TableHead>
        <TableHead className="text-center">Build</TableHead>
        <TableHead className="text-center">Test</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((item) => (
        <TableRow
          key={item.model}
          className={item.is_adapted ? "border-t-2 border-dotted" : ""}
        >
          <TableCell className="font-medium">
            {item.link ? (
              <Link href={item.link} target="_blank" className="text-primary custom-link">
                {item.model}
              </Link>
            ) : (
              item.model
            )}
          </TableCell>
          <TableCell className="text-center">{item.pass1_build}</TableCell>
          <TableCell className="text-center">{item.pass1_test}</TableCell>
          <TableCell className="text-center">{item.compiler_repair_build}</TableCell>
          <TableCell className="text-center">{item.compiler_repair_test}</TableCell>
          <TableCell className="text-center">{item.test_repair_build}</TableCell>
          <TableCell className="text-center">{item.test_repair_test}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
const SWE_AGENT = "SWE-agent (Claude-3.7)"
const getShortName = (fullName: string) => {
  if (fullName.startsWith("o1-mini")){
    return "o1-mini";
  }
  else if (fullName.startsWith("Adapted")){
    return SWE_AGENT;
  }
  else if (fullName.startsWith("arcee-ai/Virtuoso")){
    return "Virtuoso-Medium-v2";
  }
  else if (fullName.startsWith("claude")){
    return fullName.split(/[-_ ]/)[0] 
      + "-" 
      + fullName.split(/[-_ ]/)[1]; // splits by dash, underscore, or space
  }
  else if (fullName.startsWith("gpt")){
    return "gpt-4o";
  }
  else if (fullName.startsWith("gemini")){
    return "gemini-1.5-pro";
  }
  else if (fullName.startsWith("Qwen")){
    return "QwQ-32B-Preview";
  }
  return fullName.split(/[-_ ]/)[0]; // splits by dash, underscore, or space
};



const TestResultsBarChart: React.FC<TableComponentProps> = ({ data }) => {
  const chartData = data.map((item) => ({
    model: getShortName(item.model),
    pass1_test: Number(item.pass1_test) || 0,
    compiler_repair_test: Number(item.compiler_repair_test) || 0,
    test_repair_test: Number(item.test_repair_test) || 0,
  }));
   const COLORS = {
    default_pass1: "#8884d8",
    default_compiler: "#82ca9d",
    default_test: "#ffc658",
    swe_agent: "#ff7300", // A distinct color for SWE-agent
  };
   const customLegendPayload: Payload[] = [
    { value: 'Pass@1', type: 'square', id: 'pass1', color: COLORS.default_pass1 },
    { value: 'Compiler Repair', type: 'square', id: 'compiler', color: COLORS.default_compiler },
    { value: 'Test Repair', type: 'square', id: 'test', color: COLORS.default_test },
    { value: SWE_AGENT, type: 'square', id: 'swe_agent', color: COLORS.swe_agent },
  ];

  // Custom Tooltip Formatter
  const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const modelName = label; // The label is typically the XAxis dataKey, which is the model name
    const isSweAgent = modelName === SWE_AGENT;

    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <p className="label">{`${label}`}</p>
        {payload.map((entry, index) => {
          // Only render the entry if it's not SWE-agent, or if it's SWE-agent and the dataKey is pass1_test
          if (
            !isSweAgent ||
            (isSweAgent && entry.dataKey === "pass1_test")
          ) {
            if (isSweAgent && entry.dataKey === "pass1_test"){
              return (
                <p key={`item-${index}`} style={{ color: entry.color }}>
                  {`SWE Pass Rate : ${entry.value}`}
                </p>
              )
            } 
            return (
              <p key={`item-${index}`} style={{ color: entry.color }}>
                {`${entry.name} : ${entry.value}`}
              </p>
            );
          }
          return null;
        })}
      </div>
    );
  }

  return null;
};

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="model"
            angle={-30}
            textAnchor="end"
            interval={0}
            height={100}
          />
          <YAxis />
          {/* Use the custom content component for the Tooltip */}
          <Tooltip content={<CustomTooltip />} />
          <Legend payload={customLegendPayload} />

          {/* Bar for Pass@1 */}
          <Bar dataKey="pass1_test" name="Pass@1">
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-pass1-${index}`}
                fill={
                  entry.model === SWE_AGENT
                    ? COLORS.swe_agent
                    : COLORS.default_pass1
                }
              />
            ))}
          </Bar>

          {/* Conditional Bars for Compiler Repair and Test Repair */}
          <Bar dataKey="compiler_repair_test" name="Compiler Repair">
            {chartData.map((entry, index) =>
              // Render the bar only if the model is NOT 'SWE-agent'
              entry.model !== SWE_AGENT ? (
                <Cell key={`cell-compiler-${index}`} fill={COLORS.default_compiler} />
              ) : null
            )}
          </Bar>
          <Bar dataKey="test_repair_test" name="Test Repair">
            {chartData.map((entry, index) =>
              // Render the bar only if the model is NOT 'SWE-agent'
              entry.model !== SWE_AGENT ? (
                <Cell key={`cell-test-${index}`} fill={COLORS.default_test} />
              ) : null
            )}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
