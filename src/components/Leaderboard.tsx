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

// The ModelData interface now matches the structure of your updated data file
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
  // The component is now simplified to just pass the data to the table
  return (
    <div className="flex flex-col items-stretch p-4">
      <div className="mb-4">
        <TableComponent data={scoresData} />
      </div>
    </div>
  );
}

interface TableComponentProps {
  data: ModelData[];
}

// The TableComponent is rebuilt for the new data structure
const TableComponent: React.FC<TableComponentProps> = ({ data }) => (
  <Table>
    <TableHeader>
      {/* First header row with column groups */}
      <TableRow>
        <TableHead rowSpan={2} className="align-bottom">Model</TableHead>
        <TableHead colSpan={2} className="text-center border-b">Pass@1</TableHead>
        <TableHead colSpan={2} className="text-center border-b">Pass@1 + Compiler repair (r=3)</TableHead>
        <TableHead colSpan={2} className="text-center border-b">Pass@1 + Test repair (r=3)</TableHead>
      </TableRow>
      {/* Second header row with specific sub-columns */}
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
            // Applies a dotted top border for the special 'Adapted' row
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