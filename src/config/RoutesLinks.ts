const RouterRender = {
	admin: {
		index: "admin/dashboard/index",

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
		login: "login",
		dashboard:"client/dashboard",
		credicard: "client/credicard",
		pay_confirm: "client/pay_confirm",
		client_login: "client/login",
		client_register: "client/register",
	},
};

//
export const RoutesLinks = {
	admin: {
		index: "/admin/dashboard",

		// CATEGORIAS
		categoryList: "/admin/dashboard/category",
		categoryForm: (id: number) =>
			`/admin/dashboard/category/form${id ? `/${id}` : ""}`,

		categoryFormCreate: "/admin/dashboard/category/create",
		categoryFormEdit: (id: number) => `/admin/dashboard/category/update/${id}`,

		// PRODUCTOS
		productList: "/admin/dashboard/product",
		productForm: (id: number) =>
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

		login: "/login",
		client_register: "/client/register",
		client_login: "/client/login",
		dashboard:"/client/dashboard",
		credicard: "/client/credicard",
		pay_confirm: "/client/pay_confirm",
		signOut: "/sign_out",
	},
};

RoutesLinks.admin.categoryList;
// RoutesLinks.dashboard.imageCreate(product.id)
export default RouterRender;
