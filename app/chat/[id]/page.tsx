import Chat from "@/app/(chat)/Chat";
import connectDb from "@/lib/connectdb";

interface PageProps {
  params: { id: string };
}
export default async function Page({ params }: PageProps) {
  await connectDb();
  const { id } = await params;

  return (
    <>
      <Chat id={id} />
    </>
  );
}
