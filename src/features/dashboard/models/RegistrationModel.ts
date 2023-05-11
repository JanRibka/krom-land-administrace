interface RegistrationModel {
  action_id: number;
  action_name: string;
  user_email: string;
  child_name: string;
  child_last_name: string;
  child_birthday: string;
  first_representative_name: string;
  first_representative_last_name: string;
  first_representative_phone_number: string;
  second_representative_name: string;
  second_representative_last_name: string;
  second_representative_phone_number: string;
  address_name: string;
  address_last_name: string;
  address_street_cp: string;
  address_city: string;
  address_psc: string;
  other_hendicap: string;
  other_photos: boolean | null;
  other_how_children_arrives: number;
  other_pickup_person: string;
  other_pay_method: number;
  other_other_info: string;
  registration_date: Date;
  payed: boolean;
  state: number;
  id_variable_symbol: number;
  action_price: number;
}

export default RegistrationModel;
