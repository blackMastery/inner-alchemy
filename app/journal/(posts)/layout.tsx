/** Reading column for journal posts. The index sets its own width. */
export default function JournalPostLayout({ children }: LayoutProps<"/journal">) {
  return (
    <article className="mx-auto max-w-[760px] px-8 py-24 max-md:px-[22px] max-md:py-16">
      {children}
    </article>
  );
}
