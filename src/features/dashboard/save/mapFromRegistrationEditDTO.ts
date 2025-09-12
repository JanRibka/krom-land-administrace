import RegistrationEditDTO from "shared/DTOs/RegistrationEditDTO";
import SelectDataModel from "shared/models/RegistrationDataModel";

import RegistrationEditModel from "../models/RegistrationEditModel";
import RegistrationModel from "../models/RegistrationModel";

export const mapFromRegistrationEditDTO = (
  registrationEditDTO?: RegistrationEditDTO | null
) => {
  const result: RegistrationEditModel = {
    Registration: {
      id: registrationEditDTO?.Registration.id,
      id_action: registrationEditDTO?.Registration.id_action,
      action_name: registrationEditDTO?.Registration.action_name,
      user_email: registrationEditDTO?.Registration.user_email,
      child_name: registrationEditDTO?.Registration.child_name,
      child_last_name: registrationEditDTO?.Registration.child_last_name,
      child_birthday: registrationEditDTO?.Registration.child_birthday,
      first_representative_name:
        registrationEditDTO?.Registration.first_representative_name,
      first_representative_last_name:
        registrationEditDTO?.Registration.first_representative_last_name,
      first_representative_phone_number:
        registrationEditDTO?.Registration.first_representative_phone_number,
      second_representative_name:
        registrationEditDTO?.Registration.second_representative_name,
      second_representative_last_name:
        registrationEditDTO?.Registration.second_representative_last_name,
      second_representative_phone_number:
        registrationEditDTO?.Registration.second_representative_phone_number,
      address_name: registrationEditDTO?.Registration.address_name,
      address_last_name: registrationEditDTO?.Registration.address_last_name,
      address_street_cp: registrationEditDTO?.Registration.address_street_cp,
      address_city: registrationEditDTO?.Registration.address_city,
      address_psc: registrationEditDTO?.Registration.address_psc,
      other_hendicap: registrationEditDTO?.Registration.other_hendicap,
      other_photos: registrationEditDTO?.Registration.other_photos,
      other_how_children_arrives:
        registrationEditDTO?.Registration.other_how_children_arrives,
      other_how_children_arrives_name:
        registrationEditDTO?.Registration.other_how_children_arrives_name,
      other_pickup_person:
        registrationEditDTO?.Registration.other_pickup_person,
      other_pay_method: registrationEditDTO?.Registration.other_pay_method,
      other_pay_method_name:
        registrationEditDTO?.Registration.other_pay_method_name,
      other_other_info: registrationEditDTO?.Registration.other_other_info,
      other_t_shirt_size: registrationEditDTO?.Registration.other_t_shirt_size,
      registration_date: new Date(
        registrationEditDTO?.Registration.registration_date?.date ?? ""
      ),
      payed: registrationEditDTO?.Registration.payed,
      state: registrationEditDTO?.Registration.state,
      state_name: registrationEditDTO?.Registration.state_name,
      id_variable_symbol: registrationEditDTO?.Registration.id_variable_symbol,
      variable_symbol_name:
        registrationEditDTO?.Registration.variable_symbol_name,
      action_price: registrationEditDTO?.Registration.action_price,
    } as RegistrationModel,
    SelectsData: registrationEditDTO?.SelectsData ?? new SelectDataModel(),
  };
  return result;
};
