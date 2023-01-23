import { VoteTicker } from "@/components";
import { defaultApy } from "@/constants";
import type { Meta, StoryObj } from "@storybook/react";
import { rest } from "msw";

const meta: Meta<typeof VoteTicker> = {
  component: VoteTicker,
};

export default meta;

type Story = StoryObj<typeof VoteTicker>;

const activeCommitResult = {
  apy: defaultApy,
  activeRequests: 2,
  phase: "commit",
};

const activeRevealResult = {
  apy: defaultApy,
  activeRequests: 2,
  phase: "reveal",
};

const noVotesResult = {
  apy: defaultApy,
  activeRequests: 0,
  phase: "commit",
};

export const NoVotes: Story = {
  render: () => <VoteTicker />,
  parameters: {
    msw: {
      handlers: [
        rest.get("/api/get-voting-info", (_req, res, ctx) => {
          return res(ctx.json(noVotesResult));
        }),
      ],
    },
  },
};

export const ActiveCommit: Story = {
  render: () => <VoteTicker />,
  parameters: {
    msw: {
      handlers: [
        rest.get("/api/get-voting-info", (_req, res, ctx) => {
          return res(ctx.json(activeCommitResult));
        }),
      ],
    },
  },
};

export const ActiveReveal: Story = {
  render: () => <VoteTicker />,
  parameters: {
    msw: {
      handlers: [
        rest.get("/api/get-voting-info", (_req, res, ctx) => {
          return res(ctx.json(activeRevealResult));
        }),
      ],
    },
  },
};
