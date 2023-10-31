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


export interface ImagesAttributes {
	url: string;
	featured: boolean;
	status: string;
	productId: number;
}

export interface Category {
	id: number;
	name: string;
	description: string;
	// status: string;
}
