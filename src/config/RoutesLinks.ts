import { URL_SERVER } from ".";

const RouterRender = {
	admin: {
		index: "admin/dashboard/index",
		login: "admin/login",

		clientList: "admin/dashboard/ClientsList",
		transactionList: "admin/dashboard/transactionList",

		// CATEGORIAS
		categoryList: "admin/dashboard/categoryList",
		categoryForm: "admin/dashboard/categoryForm",

		// PRODUCTOS
		productList: "admin/dashboard/productList",
		productForm: "admin/dashboard/productForm",

		imageForm: "admin/dashboard/imageForm",
	},

	client: {
		landing: "index",
		search: "search",
		product: "product",

		login: "client/login",
		register: "client/register",

		dashboard: "client/dashboard",
		credicard: "client/credicard",
		pay_confirm: "client/pay_confirm",
		client_login: "client/login",
		client_register: "client/register",
		recover_password: "client/recover_password",
		recover_password_Link_Sended: "client/recover_password_Link_Sended",
		recover_password_SetPassword: "client/recover_password",
	},
};

//
export const RoutesLinks = {
	admin: {
		index: "/admin/dashboard",
		login: "/admin/login",

		// CLIENTES

		clientList: "/admin/dashboard/clients",
		transactionList: "/admin/dashboard/transactions",

		// CATEGORIAS
		categoryList: "/admin/dashboard/category",
		categoryForm: (id?: number) =>
			`/admin/dashboard/category/form${id ? `/${id}` : ""}`,

		categoryFormCreate: "/admin/dashboard/category/create",
		categoryFormEdit: (id: number) => `/admin/dashboard/category/update/${id}`,

		// PRODUCTOS
		productList: "/admin/dashboard/product",
		productForm: (id?: number) =>
			`/admin/dashboard/product/form${id ? `/${id}` : ""}`,

		productFormCreate: "/admin/dashboard/product/create",
		productFormEdit: (id: number) => `/admin/dashboard/product/update/${id}`,

		imageForm: (productId: number) =>
			`/admin/dashboard/product/form/${productId}/image`,
		imageCreate: (productId: number) =>
			`/admin/dashboard/product/form/${productId}/image`,
		imageFeatured: (productId: number, id: string) =>
			`/admin/dashboard/product/form/${productId}/image/${id}/featured`,

		imageDelete: (productId: number, id: string) =>
			`/admin/dashboard/product/form/${productId}/image/${id}/delete`,
	},
	client: {
		landing: "/",
		search: "/search",
		product: "/product",
		productLink:(productId:number|string)=> `/product/${productId}`,
		productLinkAbsolute:(productId:number|string)=> `${URL_SERVER}/product/${productId}`,
		sendRating: (productId: number | string) =>
			`/product/${productId}/create_rating`,

		login: "/client/login",
		client_login: "/client/login",

		register: "/client/register",
		client_register: "/client/register",

		dashboard: "/client/dashboard",
		credicard: "/client/credicard",
		pay_confirm: "/client/pay_confirm",

		recover_password: "/client/recover_password",
		// recover_password_SetPassword: "/client/recover_password",

		signOut: "/sign_out",
	},
};

RoutesLinks.admin.categoryList;
// RoutesLinks.dashboard.imageCreate(product.id)
export default RouterRender;
