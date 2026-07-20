import { getFolders } from "@/generated/api";
import { PageWrapper } from "@/modules/shared/page-wrapper";
import { TerminalContent } from "@/modules/terminal/terminal-content";

export default async function TerminalPage() {
  const { data: folders } = await getFolders();
  return (
    <PageWrapper>
      <TerminalContent folders={folders} />
    </PageWrapper>
  );
}
