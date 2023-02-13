import { Header } from "@/components";
import { chains, rainbowKitTheme, wagmiClient } from "@/pages/_app";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Meta, StoryObj } from "@storybook/react";
import { WagmiConfig } from "wagmi";

const meta: Meta<typeof Header> = {
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

const Template: Story = {
  render: (args) => (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={rainbowKitTheme}>
        <Header {...args} />
      </RainbowKitProvider>
    </WagmiConfig>
  ),
};

export const VerifyPage: Story = {
  ...Template,
  args: {
    page: "verify",
  },
  parameters: {
    nextjs: {
      router: {
        pathname: "/",
      },
    },
  },
};

export const ProposePage: Story = {
  ...Template,
  args: {
    page: "propose",
  },
  parameters: {
    nextjs: {
      router: {
        pathname: "/propose",
      },
    },
  },
};

export const SettledPage: Story = {
  ...Template,
  args: {
    page: "settled",
  },
  parameters: {
    nextjs: {
      router: {
        pathname: "/settled",
      },
    },
  },
};
