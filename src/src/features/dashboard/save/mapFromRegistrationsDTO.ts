import RegistrationDTO from "shared/DTOs/RegistrationDTO";
import { DashboardState } from "shared/infrastructure/store/dashboard/dashboardSlice";

import RegistrationModel from "../models/RegistrationModel";

export const mapFromRegistrationsDTO = (
  registrationsDTO?: RegistrationDTO[] | null
) => {
  const result: Partial<DashboardState> = {
    Registrations:
      registrationsDTO?.map((item) => {
        return {
          id: item.id,
          id_action: item.id_action,
          action_name: item.action_name,
          user_email: item.user_email,
          child_name: item.child_name,
          child_last_name: item.child_last_name,
          child_birthday: item.child_birthday,
          first_representative_name: item.first_representative_name,
          first_representative_last_name: item.first_representative_last_name,
          first_representative_phone_number:
            item.first_representative_phone_number,
          second_representative_name: item.second_representative_name,
          second_representative_last_name: item.second_representative_last_name,
          second_representative_phone_number:
            item.second_representative_phone_number,
          address_name: item.address_name,
          address_last_name: item.address_last_name,
          address_street_cp: item.address_street_cp,
          address_city: item.address_city,
          address_psc: item.address_psc,
          other_hendicap: item.other_hendicap,
          other_photos: item.other_photos,
          other_how_children_arrives: item.other_how_children_arrives,
          other_how_children_arrives_name: item.other_how_children_arrives_name,
          other_pickup_person: item.other_pickup_person,
          other_pay_method: item.other_pay_method,
          other_pay_method_name: item.other_pay_method_name,
          other_other_info: item.other_other_info,
          other_t_shirt_size: item.other_t_shirt_size,
          registration_date: new Date(item.registration_date?.date ?? ""),
          payed: item.payed,
          state: item.state,
          state_name: item.state_name,
          id_variable_symbol: item.id_variable_symbol,
          variable_symbol_name: item.variable_symbol_name,
          action_price: item.action_price,
        } as RegistrationModel;
      }) ?? [],
    _registrationsLoaded: true,
  };

  return result;
};
