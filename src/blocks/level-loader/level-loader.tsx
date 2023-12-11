"use client";
import levels from "@/blocks/levels";
import { Children, cloneElement, useRef } from "react";

import { TableContentDynamicProps } from "@/components/table-contents";

type LevelLoaderProps = {
  mode: "component" | "source";
  onHover: (index: number | null) => void;
  hovered: number | null;
  level: number;
};

export default function LevelLoader({
  mode,
  onHover,
  hovered,
  level,
}: LevelLoaderProps) {
  const levelItems = useRef<HTMLElement[]>();
  if (!levelItems.current) {
    levelItems.current = [];
  }

  const hoveredElemet = hovered === null ? null : levelItems.current[hovered];

  function mouseHandler(event: MouseEvent) {
    const element =
      event.type === "mouseenter" ? event.target : event.relatedTarget;
    if (!levelItems.current || !(element instanceof HTMLElement)) return;
    const index = levelItems.current.indexOf(element);
    onHover(index < 0 ? null : index);
  }

  function assignIndex(child: JSX.Element): JSX.Element {
    const element = cloneElement<TableContentDynamicProps>(
      child,
      {
        mode,
        hoveredElemet: hoveredElemet,
        onMouseEnter: mouseHandler,
        onMouseLeave: mouseHandler,
        refCallback: (node) => {
          node ? levelItems.current?.push(node) : levelItems.current?.pop();
        },
      },
      Children.map(child.props.children, (child) => {
        return assignIndex(child);
      })
    );
    return element;
  }

  const levelComponent = Children.map(levels[1], assignIndex);

  return levelComponent;
}
