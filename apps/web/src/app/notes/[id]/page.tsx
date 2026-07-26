import { NotePageContent } from "@/modules/notes/note-page-content";
import { PageWrapper } from "@/modules/shared/page-wrapper";

export default async function NotesPage() {
  return (
    <PageWrapper>
      <NotePageContent />
    </PageWrapper>
  );
}
