export interface Product {
	id: number;
	code: string;
	name: string;
	cost: number;
	description: string;
	size: string;
	brand: string;
	// status: string;
	createAt: date;
	updateAt: date;
}

export interface Image {
	id: number;
	url: string;
	featured: boolean;
	productId:string
	// status: string
}

export interface Category {
	id: number;
	name: string;
	description: string;
	// status: string;
}
