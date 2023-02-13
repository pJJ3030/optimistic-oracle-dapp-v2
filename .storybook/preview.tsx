import "@rainbow-me/rainbowkit/styles.css";
import { Decorator, Parameters } from "@storybook/react";
import { initialize, mswDecorator } from "msw-storybook-addon";
import React from "react";
import { GlobalStyle } from "../src/components/GlobalStyle";
import "../src/styles/fonts.css";

initialize();

export const parameters: Parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators: Decorator[] = [
  // @ts-expect-error mswDecorator has not updated to the storybook v7 types
  mswDecorator,
  (Story) => (
    <>
      <GlobalStyle />
      <Story />
    </>
  ),
];
