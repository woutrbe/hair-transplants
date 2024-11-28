import clsx from "clsx";
import { Star } from "lucide-react";

export default function StarRating({
	rating,
	size = 'size-6'
}: {
	rating: number;
	size?: string;
}) {
	return (
		<div className="flex items-center gap-1">
			{
				[1, 2, 3, 4, 5].map((x: number) => (
					<Star
						key={x}
						className={clsx(
							size,
							x <= Math.floor(rating) && 'text-yellow-400 fill-yellow-400',
							x === Math.ceil(rating) && rating % 1 !== 0
								? 'text-yellow-400 fill-yellow-400 [clip-path:inset(0_50%_0_0)]'
								: 'text-gray-200 fill-gray-200'
						)}
					/>
				))
			}
		</div>
	)
}