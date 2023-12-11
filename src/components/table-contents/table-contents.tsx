"use client";

import { RefCallback, createElement, useRef } from "react";
import styles from "./table-contents.module.scss";
import clsx from "clsx";

type TableContentWrapperProps = {
  type: keyof JSX.IntrinsicElements;
} & TableContentProps;

function propsToString({ className, htmlFor, id }: TableContentProps) {
  const displayedProps = { class: className, for: htmlFor, id };

  const entries = Object.entries(displayedProps).filter(([k, v]) => !!v);

  if (entries.length === 0) return "";

  return ` ${entries.map(([k, v]) => `${k}="${v}"`).join(" ")}`;
}

type TableContentProps = {
  htmlFor?: string;
  id?: string;
  className?: string;
  children?: JSX.Element | JSX.Element[];
} & TableContentDynamicProps;

export type TableContentDynamicProps = {
  onMouseEnter?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
  refCallback?: RefCallback<HTMLElement>;
  hoveredElemet?: HTMLElement | null;
  mode?: "component" | "source";
};

function Tooltip({ children }: { children: JSX.Element }) {
  return <div className={styles.tooltip}>{children}</div>;
}

function TableContentComponent({
  type,
  children,
  hoveredElemet,
  ...props
}: TableContentWrapperProps) {
  const thisElement = useRef<HTMLElement | null>();

  const isHighlighted = thisElement.current === hoveredElemet;
  // const modifiedChildren = isHighlighted ? (
  //   <>
  //     <Tooltip>
  //       <TableContentSource type={type} {...props}></TableContentSource>
  //     </Tooltip>
  //     {children}
  //   </>
  // ) : (
  //   children
  // );
  const modifiedChildren = children;

  return createElement(
    type,
    {
      ...props,
      is: "custom",
      className: clsx(
        props.className,
        isHighlighted && styles.highlightedComponent
      ),
      ref: (node: HTMLElement) => {
        thisElement.current = node;
        if (props.refCallback) {
          props.refCallback(node);
        }
      },
    },
    modifiedChildren
  );
}

function TableContentSource({
  type,
  children,
  ...props
}: TableContentWrapperProps) {
  const thisElement = useRef<HTMLElement | null>();

  const isHighlighted =
    thisElement.current && thisElement.current === props.hoveredElemet;
  return createElement(
    "code",
    {
      className: clsx(styles.code, isHighlighted && styles.highlightedSrc),
      onMouseEnter: props.onMouseEnter,
      onMouseLeave: props.onMouseLeave,
      ref: (node: HTMLElement) => {
        thisElement.current = node;
        if (props.refCallback) {
          props.refCallback(node);
        }
      },
    },
    `<${type}${propsToString(props)}>`,
    children,
    `</${type}>`
  );
}

function TableContent({ mode, ...props }: TableContentWrapperProps) {
  if (mode === "component") return <TableContentComponent {...props} />;
  return <TableContentSource {...props} />;
}

function getComponent(type: keyof JSX.IntrinsicElements) {
  return function Component(props: TableContentProps) {
    return <TableContent type={type} {...props}></TableContent>;
  };
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const componentNames = ["apple", "bento", "orange", "plate"] as const;

const TableContents = Object.fromEntries(
  componentNames.map((name) => {
    return [capitalizeFirstLetter(name), getComponent(name)];
  })
);

export default TableContents;
