import ""; // == Using this to break ambience in this d.ts file (Prevent types from being global)

type Prettify<TObject> = { [Key in keyof TObject]: TObject[Key] } & {};

type ApiResponse<TData> = Prettify<{ success: boolean } & TData>;

export type SuccessData = ApiResponse<{
	data: {
		ItemID: number;
		ItemName: string;
		category: string;
		Description: string;
		Price: number;
		number_of_items: number;
		images: string[];
		Availability: string;
		location: string;
		vendor_id: number;
		vendor_firstname: string;
		vendor_lastname: string;
	};
}>;

export type UserInfo = ApiResponse<{
	user: {
		user_id: number;
		username: string;
		privilege: "user" | "vender";
		email: string;
	};

	vendor: {
		status: string;
		firstname: string;
		lastname: string;
		profile_pic: string;
		address: string;
		nin: string;
		sex: string;
		birth: string;
		phone_number: string;
		state: string;
		city: string;
		localgovt: string;
	};
}>;
