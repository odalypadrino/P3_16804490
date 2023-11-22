import { getCategories_Service } from "./categoryService";
import {
	getMarcasOfProducts_service,
	getTallasOfProducts_service,
} from "./productService";

export const getQueryFilters_service = async () => {
	try {
		const categories = await getCategories_Service();
		const size = await getTallasOfProducts_service();
		const brand = await getMarcasOfProducts_service();

		return { categories,  size,  brand };
	} catch (error) {
		console.log(error);
		return null;
	}
};
