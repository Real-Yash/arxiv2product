export function ReportMarkdown({
  markdown
}: Readonly<{
  markdown: string;
}>) {
  const paragraphs = markdown.split(/\n{2,}/).filter(Boolean);

  return (
    <div className="text-zinc-700 leading-relaxed max-w-none space-y-6">
      {paragraphs.map((block, index) => {
        if (block.startsWith("# ")) {
          return <h1 key={index} className="text-3xl font-bold tracking-tight text-zinc-900 mt-10 mb-6">{block.slice(2)}</h1>;
        }
        if (block.startsWith("## ")) {
          return <h2 key={index} className="text-2xl font-semibold tracking-tight text-zinc-900 mt-8 mb-4">{block.slice(3)}</h2>;
        }
        if (block.startsWith("### ")) {
          return <h3 key={index} className="text-xl font-medium tracking-tight text-zinc-900 mt-6 mb-3">{block.slice(4)}</h3>;
        }
        if (block.startsWith("> ")) {
          return <blockquote key={index} className="pl-4 border-l-4 border-zinc-200 italic text-zinc-500 py-1 my-6">{block.slice(2)}</blockquote>;
        }
        return <p key={index} className="my-4">{block}</p>;
      })}
    </div>
  );
}
