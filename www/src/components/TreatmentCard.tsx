import { Star, MapPin, Globe, ChevronRight } from 'lucide-react'
import Image from 'next/image'

import { Treatment } from "../content/types";

export default function TreatmentCard({
	treatment
}: {
	treatment: Treatment;
}) {
	return (
		<div
          key={treatment.clinic.name}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-6">
            {/* <div className="flex gap-2 mb-4">
              {clinic.badges.map((badge) => (
                <Badge key={badge} variant="secondary" className="bg-primary/10 text-primary">
                  {badge}
                </Badge>
              ))}
            </div> */}

            <div className="grid grid-cols-4 gap-6">
              {/* Section 1: Metadata */}
              <div className="col-span-4 sm:col-span-1 flex sm:flex-col items-center sm:items-start gap-4">
                <Image
                  src='/clinics/DrAcar_cosmedia.png'
                  alt={`${treatment.clinic.name} logo`}
                  width={200}
                  height={60}
                  className="rounded-lg"
                />
                <h2 className="text-2xl font-bold text-primary mb-1">{treatment.clinic.name}</h2>
                <div>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>{treatment.clinic.city}, {treatment.clinic.country}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Globe className="w-4 h-4" />
                    <div className="flex gap-1">
                      {treatment.clinic.languages.map((lang) => (
                        <span
                          key={lang}
                          className="inline-block w-6 h-4 rounded-sm overflow-hidden"
                          title={lang}
                        >
                          <Image
                            src={`https://flagcdn.com/w20/${lang.toLowerCase()}.png`}
                            alt={`${lang} flag`}
                            width={20}
                            height={15}
                            className="w-full h-full object-cover"
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

               {/* Section 2: Reviews */}
			   <div className="col-span-4 sm:col-span-1 flex flex-col justify-center">
			   <div className="text-2xl font-bold text-primary mb-1">{treatment.review.score}</div>
            <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= Math.floor(treatment.review.score)
                          ? 'text-yellow-400 fill-yellow-400'
                          : star === Math.ceil(treatment.review.score) && treatment.review.score % 1 !== 0
                          ? 'text-yellow-400 fill-yellow-400 [clip-path:inset(0_50%_0_0)]'
                          : 'text-gray-200 fill-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  Based on xx reviews
                </div>
              </div>

			  {/* Section 3: Total Price */}
              <div className="col-span-4 sm:col-span-1 flex flex-col justify-center">
                <div className="text-2xl font-bold text-primary mb-1">Total Price</div>
                <div className="text-2xl font-semibold">${treatment.price.usd_price}</div>
                <div className="text-sm text-muted-foreground">
                  {treatment.price.local_currency}{treatment.price.local_price.toLocaleString()}
                </div>
              </div>

               {/* Section 4: Price per Graft and Grafts */}
			   <div className="col-span-4 sm:col-span-1 flex flex-col justify-center">
                <div className="text-2xl font-bold text-primary mb-1">Price per Graft</div>
                <div className="text-2xl font-semibold">${(treatment.price.usd_price / treatment.grafts.from).toFixed(5)}</div>
                <div className="text-sm text-muted-foreground">
					From {treatment.grafts.from} grafts</div>
				</div>
              </div>
            </div>

          {/* Footer with CTA button */}
          <div className="px-6 py-4 bg-gray-50 flex justify-end">
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
              Book Consultation
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
	)
}