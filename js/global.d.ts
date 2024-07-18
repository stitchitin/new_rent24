// == Using exports in this d.ts file to in order break ambience (Prevent types from being global)
// == Doing this: `import ""` or this: `export {}` would also achieve the same effect

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
