"use client";
import { useState } from "react";
import LevelLoader from "@/blocks/level-loader";
import Table from "@/components/table/table";
import "./globals.scss";

export default function Level() {
  const [hovered, setHovered] = useState<null | number>(null);
  const level = 1;
  return (
    <>
      <Table>
        <LevelLoader
          mode="component"
          level={level}
          onHover={(index) => setHovered(index)}
          hovered={hovered}
        ></LevelLoader>
      </Table>

      <div style={{ background: "grey", width: "400px", margin: "0 auto" }}>
        <LevelLoader
          mode="source"
          level={level}
          onHover={(index) => setHovered(index)}
          hovered={hovered}
        ></LevelLoader>
      </div>
    </>
  );
}
