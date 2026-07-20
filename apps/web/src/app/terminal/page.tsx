import { foldersControllerFindAll } from "@/generated/api";
import { PageWrapper } from "@/modules/shared/page-wrapper";
import { TerminalContent } from "@/modules/terminal/terminal-content";

export default async function TerminalPage() {
  const { data: folders } = await foldersControllerFindAll();
  return (
    <PageWrapper>
      <TerminalContent folders={folders as any} />
    </PageWrapper>
  );
}
