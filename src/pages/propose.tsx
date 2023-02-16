import { Layout, Table } from "@/components";
import { useOracleDataContext } from "@/hooks";

export default function Propose() {
  const { propose } = useOracleDataContext();

  return (
    <Layout>
      <Table
        rows={propose ?? []}
        isLoading={propose === undefined}
        page="propose"
      />
    </Layout>
  );
}
