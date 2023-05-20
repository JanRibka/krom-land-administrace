import DateTimeDTO from "./DateTimeDTO";

class RegistrationDTO {
  id: number | null = null;
  id_action: number | null = null;
  action_name: string | null = null;
  user_email: string | null = null;
  child_name: string | null = null;
  child_last_name: string | null = null;
  child_birthday: string | null = null;
  first_representative_name: string | null = null;
  first_representative_last_name: string | null = null;
  first_representative_phone_number: string | null = null;
  second_representative_name: string | null = null;
  second_representative_last_name: string | null = null;
  second_representative_phone_number: string | null = null;
  address_name: string | null = null;
  address_last_name: string | null = null;
  address_street_cp: string | null = null;
  address_city: string | null = null;
  address_psc: string | null = null;
  other_hendicap: string | null = null;
  other_photos: boolean | null = null;
  other_how_children_arrives: number | null = null;
  other_how_children_arrives_name: string | null = null;
  other_pickup_person: string | null = null;
  other_pay_method: number | null = null;
  other_pay_method_name: string | null = null;
  other_other_info: string | null = null;
  registration_date: DateTimeDTO | null = null;
  payed: boolean | null = null;
  state: number | null = null;
  state_name: string | null = null;
  id_variable_symbol: number | null = null;
  variable_symbol_name: string | null = null;
  action_price: number | null = null;

  public constructor(init?: Partial<RegistrationDTO>) {
    Object.assign(this, init);
  }
}

export default RegistrationDTO;
