import { blueGrey700 } from "@/constants";
import { addOpacityToHsl } from "@/helpers";
import { usePanelContext } from "@/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, useEffect, useRef } from "react";
import { FocusOn } from "react-focus-on";
import styled from "styled-components";
import { Propose } from "./Propose";
import { Settled } from "./Settled";
import { Verify } from "./Verify";

export function Panel() {
  const { content, page, panelOpen, closePanel } = usePanelContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayVisibleColor = addOpacityToHsl(blueGrey700, 0.75);
  const overlayHiddenColor = addOpacityToHsl(blueGrey700, 0);
  const open = panelOpen && !!content;

  const panels = {
    verify: <Verify />,
    propose: <Propose />,
    settled: <Settled />,
  };

  const panel = page ? panels[page] : null;

  useEffect(() => {
    if (open) {
      contentRef?.current?.scrollTo({ top: 0 });
    }
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <Overlay
            onClick={closePanel}
            initial={{ backgroundColor: overlayHiddenColor }}
            animate={{ backgroundColor: overlayVisibleColor }}
            exit={{ backgroundColor: overlayHiddenColor }}
          />
        )}
      </AnimatePresence>
      <FocusOn
        enabled={open}
        onClickOutside={closePanel}
        onEscapeKey={closePanel}
        preventScrollOnFocus
      >
        <Content
          ref={contentRef}
          role="dialog"
          aria-modal={open}
          aria-labelledby="panel-title"
          style={
            {
              "--right": open ? 0 : "var(--panel-width)",
            } as CSSProperties
          }
        >
          <TitleWrapper>
            <IconWrapper>
              <Icon />
            </IconWrapper>
            <Title id="panel-title">
              More than 2.5 million people traveled through a TSA checkpoint on
              any day by December 31, 2022
            </Title>
            <CloseButton aria-label="close panel" onClick={closePanel}>
              <CloseIcon />
            </CloseButton>
          </TitleWrapper>
          {panel}
        </Content>
      </FocusOn>
    </>
  );
}

const AnimatedOverlay = motion.div;

const Overlay = styled(AnimatedOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  z-index: 1;
`;

const Content = styled.div`
  width: var(--panel-width);
  min-height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  transform: translateX(var(--right));
  background: var(--white);
  overflow-y: scroll;
  transition: transform 400ms;
  z-index: 1;
`;

const IconWrapper = styled.div``;

const Title = styled.h2``;

const CloseButton = styled.button``;

const TitleWrapper = styled.div``;
