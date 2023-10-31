const RouterRender = {
	dashboard: {
		index: "dashboard/index",

		// CATEGORIAS
		categoryList: "dashboard/categoryList",
		categoryForm: "dashboard/categoryForm",

		// PRODUCTOS
		productList: "dashboard/productList",
		productForm: "dashboard/productForm",

		imageForm: "dashboard/imageForm",
	},

	client: {
		landing: "index",
		login: "login",
	},
};

//
export const RoutesLinks = {
	dashboard: {
		index: "/dashboard",

		// CATEGORIAS
		categoryList: "/dashboard/category",
		categoryForm: (id: number) =>
			`/dashboard/category/form${id ? `/${id}` : ""}`,

		categoryFormCreate: "/dashboard/category/create",
		categoryFormEdit: (id: number) => `/dashboard/category/update/${id}`,

		// PRODUCTOS
		productList: "/dashboard/product",
		productForm: (id: number) => `/dashboard/product/form${id ? `/${id}` : ""}`,

		productFormCreate: "/dashboard/product/create",
		productFormEdit: (id: number) => `/dashboard/product/update/${id}`,

		imageForm: (productId: number) =>
			`/dashboard/product/form/${productId}/image`,
		imageCreate: (productId: number) =>
			`/dashboard/product/form/${productId}/image`,
			imageFeatured: (productId: number, id: string) =>
			`/dashboard/product/form/${productId}/image/${id}/featured`,

			imageDelete: (productId: number, id: string) =>
			`/dashboard/product/form/${productId}/image/${id}/delete`,
	},
	client: {
		landing: "/",
		login:"/login",
		signOut:"/sign_out"
	},
};

RoutesLinks.dashboard.categoryList
// RoutesLinks.dashboard.imageCreate(product.id)
export default RouterRender;
