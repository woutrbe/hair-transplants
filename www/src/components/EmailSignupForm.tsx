'use client';

import Script from "next/script";

export default function EmailSignupForm() {
	return (
		<div className="mt-5">
			<iframe data-tally-src="https://tally.so/embed/mBbYg4?alignLeft=1&transparentBackground=1&dynamicHeight=1" loading="lazy" width="100%" height="100"></iframe>
			<Script
				id="tally-js"
				src="https://tally.so/widgets/embed.js"
				onLoad={() => {
					// @ts-expect-error I don't know, this shit don't work
					Tally.loadEmbeds();
				}}
			/>
		</div>
	)
}