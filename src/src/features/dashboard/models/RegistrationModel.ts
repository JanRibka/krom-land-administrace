class RegistrationModel {
  id: number = 0;
  id_action: number = 0;
  action_name: string = "";
  user_email: string = "";
  child_name: string = "";
  child_last_name: string = "";
  child_birthday: string = "";
  first_representative_name: string = "";
  first_representative_last_name: string = "";
  first_representative_phone_number: string = "";
  second_representative_name: string = "";
  second_representative_last_name: string = "";
  second_representative_phone_number: string = "";
  address_name: string = "";
  address_last_name: string = "";
  address_street_cp: string = "";
  address_city: string = "";
  address_psc: string = "";
  other_hendicap: string = "";
  other_photos: boolean = false;
  other_how_children_arrives: number = 0;
  other_how_children_arrives_name: string = "";
  other_pickup_person: string = "";
  other_pay_method: number = 0;
  other_pay_method_name: string = "";
  other_other_info: string = "";
  other_t_shirt_size: string = "";
  registration_date: string = "";
  payed: boolean = false;
  state: number = 0;
  state_name: string = "";
  id_variable_symbol: number = 0;
  variable_symbol_name: string = "";
  action_price: number = 0;

  public constructor(init?: Partial<RegistrationModel>) {
    Object.assign(this, init);
  }
}

export default RegistrationModel;
