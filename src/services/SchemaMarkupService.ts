import { RoutesLinks } from "../config/RoutesLinks";
import { ProductWithAverageRating } from "../models/Product.model";

export const schemaListOfProducts = (products: ProductWithAverageRating[]) => {
	const itemListElement = products.map(
		({ id, name, description, brand, cost, images, averageRating }) => ({
			"@type": "Product",
			name,
			image: images[0].url,
			description,
			aggregateRating: {
				"@type": "AggregateRating",
				ratingValue: averageRating,
				reviewCount: "11",
			},
			brand: {
				"@type": "Thing",
				name: brand,
			},
			offers: {
				"@type": "Offer",
				url: RoutesLinks.client.productLinkAbsolute(id),
				priceCurrency: "USD",
				price: cost,
				availability: "https://schema.org/InStock",
				seller: {
					"@type": "Organization",
					name: "Odaly Sport",
				},
			},
		})
	);

	const all = {
		"@context": "https://schema.org/",
		"@type": "ItemList",
		itemListElement,
	};

	return JSON.stringify(all);
};

export const schemaByProduct = ({
	id,
	name,
	description,
	brand,
	cost,
	images,
	reviewCount,
	averageRating,
}: ProductWithAverageRating) =>
	JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Product",
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: averageRating,
			reviewCount,
		},
		name,
		image: images[0].url,
		description,
		brand: {
			"@type": "Thing",
			name: brand,
		},
		offers: {
			"@type": "Offer",
			url: RoutesLinks.client.productLinkAbsolute(id),
			priceCurrency: "USD",
			price: cost,
			availability: "https://schema.org/InStock",
			seller: {
				"@type": "Organization",
				name: "Odaly Sport",
			},
		},
		// review: [
		// 	{
		// 		"@type": "Review",
		// 		author: "Ellie",
		// 		datePublished: "2011-04-01",
		// 		reviewBody: "The lamp burned out and now I have to replace it.",
		// 		name: "Not a happy camper",
		// 		reviewRating: {
		// 			"@type": "Rating",
		// 			bestRating: "5",
		// 			ratingValue: "1",
		// 			worstRating: "1",
		// 		},
		// 	},
		// ],
	});
