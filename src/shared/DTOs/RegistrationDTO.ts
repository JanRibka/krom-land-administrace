import DateTimeDTO from './DateTimeDTO';

interface RegistrationDTO {
  id: number;
  id_action: number;
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
  other_how_children_arrives_name: string;
  other_pickup_person: string;
  other_pay_method: number;
  other_pay_method_name: string;
  other_other_info: string;
  registration_date: DateTimeDTO;
  payed: boolean;
  state: number;
  state_name: string;
  id_variable_symbol: number;
  variable_symbol_name: string;
  action_price: number;
}

export default RegistrationDTO;
