import { OracleQueryList, OracleQueryTable } from "@/components";
import { hideOnMobileAndUnder, showOnMobileAndUnder } from "@/helpers";
import { useFilterAndSearchContext } from "@/hooks";
import type { PageName } from "@shared/types";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useTimeout } from "usehooks-ts";

interface Props {
  page: PageName;
}

export function OracleQueries({ page }: Props) {
  const { results: queries } = useFilterAndSearchContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (queries.length > 0) {
      setIsLoading(false);
    }
  }, [queries]);

  useTimeout(() => {
    if (queries !== undefined) {
      setIsLoading(false);
    }
  }, 3000);

  return (
    <>
      <DesktopWrapper>
        <OracleQueryTable page={page} rows={queries} isLoading={isLoading} />
      </DesktopWrapper>
      <MobileWrapper>
        <OracleQueryList page={page} items={queries} isLoading={isLoading} />
      </MobileWrapper>
    </>
  );
}

const DesktopWrapper = styled.div`
  ${hideOnMobileAndUnder}
`;

const MobileWrapper = styled.div`
  ${showOnMobileAndUnder}
`;
