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
} from "recharts";

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

const getShortName = (fullName: string) => {
  if (fullName.startsWith("o1-mini")){
    return "o1-mini";
  }
  else if (fullName.startsWith("Adapted")){
    return "SWE-agent";
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

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="model"
            angle={-30}
            textAnchor="end"
            interval={0}
            height={100}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pass1_test" name="Pass@1" fill="#8884d8" />
          <Bar dataKey="compiler_repair_test" name="Compiler Repair" fill="#82ca9d" />
          <Bar dataKey="test_repair_test" name="Test Repair" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
