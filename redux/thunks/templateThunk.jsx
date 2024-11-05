import { supabase } from "../utils/supabase/supabaseClient.jsx";
import { setSomeData, setMoreData } from "../slices/templateSlice";



export const templateThunk = (someData) => async (dispatch) => {
	console.log("IN TEMPLATE THUNK ----> templateThunk(someData): ", someData);

	try {
		const query = await supabase.from("test_table").select("*");
		if (query.error) {
			console.error("SUPABASE QUERY ERROR!: ", query.error);
			dispatch(setSomeData(query.data));
		} else {
			console.log("SUPABASE QUERY SUCCESS!: ", query.data);
			dispatch(setSomeData(query.data));
		}
	} catch (error) {
		console.log("TEMPLATE THUNK ERROR --> templateThunk(someData): ", error);
	}
};
