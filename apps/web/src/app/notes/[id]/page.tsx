import { getNoteById } from "@/generated/api";
import { NotePageContent } from "@/modules/notes/note-page-content";
import { PageWrapper } from "@/modules/shared/page-wrapper";

export default async function NotesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: note } = await getNoteById(id);
  return (
    <PageWrapper>
      <NotePageContent note={note} />
    </PageWrapper>
  );
}
