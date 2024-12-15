import { Metadata } from "next";
import { Suspense } from 'react'
import { Globe, MapPin, MessageCircle, Scissors } from 'lucide-react'
import { Badge } from '@/components/ui/badge';
import StarRating from '@/components/StarRating';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Locations',
        description: 'Locations',

        alternates: {
            canonical: `${process.env.URL}/location`,
        }
    }
}

export default async function LocationPage() {
    const clinicsData = [ 
      {
        LogoName: "EHC",
        ClinicName: "Example Hair Clinic",
        Website: "https://examplehairclinic.com",
        Location: "123 Main St",
        Languages: "English, Spanish",
        Country: "United States",
        CountryCode: "US",
        City: "New York",
        ReviewScore: 4.8,
        TotalScore: 5,
        TotalReviews: 1250,
        Source: "Google Reviews",
        local_currency: "USD",
        Methods: "FUE, FUT",
        ConsultationPrice: 0,
        ConsultationOnline: true,
        lat: 40.7128,
        lng: -74.0060
      },
      {
        LogoName: "HRT",
        ClinicName: "Hair Restoration Turkey",
        Website: "https://hairrestorationturkey.com",
        Location: "456 Istiklal St",
        Languages: "Turkish, English, German",
        Country: "Turkey",
        CountryCode: "TR",
        City: "Istanbul",
        ReviewScore: 4.9,
        TotalScore: 5,
        TotalReviews: 2000,
        Source: "Trustpilot",
        local_currency: "EUR",
        Methods: "FUE, DHI",
        ConsultationPrice: 50,
        ConsultationOnline: true,
        lat: 41.0082,
        lng: 28.9784
      },
      {
        LogoName: "BHI",
        ClinicName: "Brazilian Hair Institute",
        Website: "https://brazilianhairinstitute.com",
        Location: "789 Copacabana Ave",
        Languages: "Portuguese, English, Spanish",
        Country: "Brazil",
        CountryCode: "BR",
        City: "Rio de Janeiro",
        ReviewScore: 4.7,
        TotalScore: 5,
        TotalReviews: 800,
        Source: "Facebook",
        local_currency: "BRL",
        Methods: "FUE, FUT, DHI",
        ConsultationPrice: 100,
        ConsultationOnline: false,
        lat: -22.9068,
        lng: -43.1729
      },
      {
        LogoName: "THC",
        ClinicName: "Thai Hair Center",
        Website: "https://thaihaircenter.com",
        Location: "101 Sukhumvit Rd",
        Languages: "Thai, English, Chinese",
        Country: "Thailand",
        CountryCode: "TH",
        City: "Bangkok",
        ReviewScore: 4.6,
        TotalScore: 5,
        TotalReviews: 600,
        Source: "Yelp",
        local_currency: "THB",
        Methods: "FUE, DHI",
        ConsultationPrice: 0,
        ConsultationOnline: true,
        lat: 13.7563,
        lng: 100.5018
      },
      {
        LogoName: "IHR",
        ClinicName: "Indian Hair Restoration",
        Website: "https://indianhairrestoration.com",
        Location: "222 MG Road",
        Languages: "Hindi, English, Bengali",
        Country: "India",
        CountryCode: "IN",
        City: "Mumbai",
        ReviewScore: 4.5,
        TotalScore: 5,
        TotalReviews: 1500,
        Source: "Google Reviews",
        local_currency: "INR",
        Methods: "FUE, FUT",
        ConsultationPrice: 1000,
        ConsultationOnline: true,
        lat: 19.0760,
        lng: 72.8777
      }
    ];

    if (clinicsData.length === 0) {
        return <p className="text-center text-gray-500">No clinics found. Try a different search.</p>
    }

    return (
        <div className="mb-20">
            <Suspense fallback={<div>Loading...</div>}>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 	{clinicsData.map((clinic, index) => {
                        const languageArray = clinic.Languages.split(',').map(lang => lang.trim());
                        const methodsArray = clinic.Methods.split(',').map(method => method.trim());

                        return (
                            <Card key={index} className="w-full">
                                <CardHeader className="flex flex-col items-center space-y-4 pb-6">
                                    <div className="w-32 h-32 overflow-hidden bg-gray-200 flex items-center justify-center">
                                        <img 
                                            src={`/placeholder.svg?height=128&width=128&text=${clinic.LogoName}`} 
                                            alt={`${clinic.ClinicName} logo`} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <CardTitle className="text-xl font-bold text-center">{clinic.ClinicName}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Globe className="h-4 w-4" />
                                                <a href={clinic.Website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{clinic.Website}</a>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <MapPin className="h-4 w-4" />
                                            <span>{clinic.Location}, {clinic.City}, {clinic.Country}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <MessageCircle className="h-4 w-4" />
                                            <div className="flex flex-wrap gap-1">
                                                {languageArray.map((lang, index) => (
                                                    <Badge key={index} variant="secondary">{lang}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
											<StarRating rating={clinic.ReviewScore} />
											<div className="text-sm text-muted-foreground">
												<a href={clinic.Source} target="blank" className="hover:underline">{clinic.ReviewScore} stars, {clinic.TotalReviews} reviews</a>
											</div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Scissors className="h-4 w-4" />
                                            <div className="flex flex-wrap gap-1">
                                                {methodsArray.map((method, index) => (
                                                    <Badge key={index} variant="secondary">{method}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="font-semibold">Consultation:</span> {clinic.ConsultationPrice === 0 ? 'Free' : `${clinic.ConsultationPrice} ${clinic.local_currency}`}
                                            {clinic.ConsultationOnline && <Badge className="ml-2" variant="outline">Online Available</Badge>}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
              </Suspense>
        </div>
    );
}