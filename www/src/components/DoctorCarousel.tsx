"use client"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"
import { DoctorCard } from "./DoctorCard"

const doctors = [
	{ name: "John Smith", imageUrl: "/placeholder.svg?height=300&width=300" },
	{ name: "Emily Johnson-Williams", imageUrl: "/placeholder.svg?height=300&width=300" },
	{ name: "Michael Christopher Alexander Brown", imageUrl: "/placeholder.svg?height=300&width=300" },
	{ name: "Sarah", imageUrl: "/placeholder.svg?height=300&width=300" },
	{ name: "David Wilson", imageUrl: "/placeholder.svg?height=300&width=300" },
]

export function DoctorCarousel() {
	return (
		<Carousel
			opts={{
				align: "start",
				loop: true,
			}}
			className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto"
		>
			<CarouselContent>
				{doctors.map((doctor, index) => (
					<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
						<div className="p-1">
							<DoctorCard name={doctor.name} imageUrl={doctor.imageUrl} />
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	)
}

