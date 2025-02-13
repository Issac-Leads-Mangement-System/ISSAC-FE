import * as Yup from "yup";

export type ICreateOrderModalSchema = {
  order_basic_info: {
    lead_id: string;
    lead_job_id: number | undefined;
    former_company: string;
    mobility: boolean;
    order_type: string;
  };
  order_customer_info: {
    customer_id: string;
    customer_full_name: string;
    customer_phone: string;
    customer_phone_2: string;
    customer_phone_home: string;
    customer_city: string;
    customer_street: string;
    customer_home_number: string;
    customer_apartment_number: string;
  };
  order_schedule: {
    order_supply_date: Date | string;
    order_supply_time_range: string;
    order_supply_comment: string;
  };
  order_customer_payment: {
    order_card_number: string;
    order_card_expired_date: string;
    order_card_cvv: string;
  };
  order_properties: {
    order_package_id: number | null;
    order_monthly_price: number;
    order_installation_price: number | null;
    order_installation_payments: number | null;
    tv_streamers: number | null;
    tv_users: number | null;
    wifi_extenders: number | null;
    orders_tv_properties_comment: string;
    order_phone_numbers: [string];
  };
};

export const initialValues: ICreateOrderModalSchema = {
  order_basic_info: {
    lead_id: "",
    lead_job_id: undefined,
    former_company: "",
    mobility: false,
    order_type: "",
  },
  order_customer_info: {
    customer_id: "",
    customer_full_name: "",
    customer_phone: "",
    customer_phone_2: "",
    customer_phone_home: "",
    customer_city: "",
    customer_street: "",
    customer_home_number: "",
    customer_apartment_number: "",
  },
  order_schedule: {
    order_supply_date: "",
    order_supply_time_range: "",
    order_supply_comment: "",
  },
  order_customer_payment: {
    order_card_number: "",
    order_card_expired_date: "",
    order_card_cvv: "",
  },
  order_properties: {
    order_package_id: null,
    order_monthly_price: 0,
    order_installation_price: null,
    order_installation_payments: null,
    tv_streamers: null,
    tv_users: null,
    wifi_extenders: null,
    orders_tv_properties_comment: "",
    order_phone_numbers: [""],
  },
};
