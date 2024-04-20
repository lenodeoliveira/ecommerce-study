type CustomerOutPut = {
  id: number;
  age: number;
  name: string;
  email: string;
  document: string;
  genre: string;
  address: Address[];
  created_at?: Date;
  updated_at?: Date;
};

type Address = {
  street: string;
  country: string;
  city: string;
  zipcode: string;
  borough: string;
  residential_number: number;
  main_address?: boolean;
  complement?: string;
  created_at?: Date;
  updated_at?: Date;
};

export { CustomerOutPut };
