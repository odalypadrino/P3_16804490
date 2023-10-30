const RouterRender = {
	dashboard: {
		categoryList: "dashboard/categoryList",
		categoryForm: "dashboard/categoryForm",
		productList: "dashboard/productList",
		productForm: "dashboard/productForm",
		imageForm: "dashboard/imageForm",
	},

	client: {
		landing: "index",
	},
};

export const RoutesLinks = {
	dashboard: {
		categoryList: "/category",
		categoryForm: (id: number) => `/category/form/${id}`,

		productList: "/product",
		productForm: (id: number) => `/product/form/${id}`,

		imageForm: "",
	},

	client: {
		landing: "/",
	},
};
export default RouterRender;
