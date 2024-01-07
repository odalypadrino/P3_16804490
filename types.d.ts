export interface ProductAttributes {
	id: number;
	code: string;
	name: string;
	cost: number;
	description: string;
	size: string | null;
	brand: string | null;
	status: string;
	categoryId: number;
}

export interface ImagesAttributes {
	id: number;
	url: string;
	featured: boolean;
	status: string;
	productId: number;
}

export interface CategoryAttributes {
	id: number;
	name: string;
	description: string;
	status: string;
}

export interface ClientAttributes {
	id: number;
	name: string;
	lastName: string;
	email: string;
	password: string;
	birthday: Date;
	phoneNumber: string;
	status: string;
}

export interface QueryProduct {
	text: string | null;
	brand: string | null;
	size: string | null;
	categoryId: string | null;
}
