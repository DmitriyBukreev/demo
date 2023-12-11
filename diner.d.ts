import * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      plate: HTMLElement;
      bento: HTMLElement;
      apple: HTMLElement;
      pickle: HTMLElement;
      orange: HTMLElement;
    }
  }
}

type Messages = typeof import("./src/messages/en.json");
declare interface IntlMessages extends Messages {}
