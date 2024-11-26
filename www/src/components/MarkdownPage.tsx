import { marked, Tokens } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import Link from "next/link";

interface Props {
	title: string;
	content: string;
}

export default async function MarkdownPage({
	title,
	content
}: Props) {
	marked.use(gfmHeadingId());

	const parsedContent = await marked.parse(content, {
		gfm: true,
	});

	const parsed = marked.lexer(content);
	const headings = parsed.filter(x => x.type === 'heading') as Tokens.Heading[];
	const filteredHeadings = headings.filter(h => h.depth === 2).map(h => ({
		text: h.text,
		anchor: h.text.replaceAll('.', '').replaceAll(' ', '-').replaceAll(':', '').toLowerCase()
	}));

	return (
		<div className="md:flex gap-5 relative">
			{filteredHeadings.length > 0 && <div className="hidden md:block mb-5 md:mb-0 md:w-1/4 md:sticky top-4 self-start">
				<div className="uppercase font-bold mb-2">Table of contents</div>
				<ol>
					{filteredHeadings.map((h, i) => {
						return (
							<li key={h.anchor}>
								<Link
									href={`#${h.anchor}`}
									title={h.text}
									className="text-gray-600 hover:text-black font-semibold"
								>{i + 1}. {h.text}</Link>
							</li>
						)
					})}
				</ol>
			</div>}
			<div className="md:w-3/4 mx-auto">
				<h2 className="text-3xl font-bold mb-5">{title}</h2>
				<div
					className="page__content"
					dangerouslySetInnerHTML={{
						__html: parsedContent,
					}}
				/>
			</div>
		</div>
	)
}