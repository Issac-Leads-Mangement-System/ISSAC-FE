import { create } from "zustand";
import api from "../../api";
import useNotificationStore from "../Notification/notification-store";
import dayjs from "dayjs";

interface IOrdersListState {
  orders: any[];
  orderCount: number;
  isLoading: boolean;
  searchValue: string;
  order: any;
  pagination: any;
}

const ordersListStore = create<IOrdersListState>((set) => ({
  orders: [],
  isLoading: false,
  searchValue: "",
  orderCount: 0,
  order: {},
  pagination: {
    pageSize: 10,
    page: 0,
  },

  getOrders: async (type: string) => {
    const { showNotification } = useNotificationStore.getState();
    try {
      set({ isLoading: true });
      const { searchValue, pagination } = ordersListStore.getState();
      const response = await api.post(
        `${process.env.REACT_APP_BASE_URL}/orders/?page=${
          pagination.page + 1
        }&limit=${pagination.pageSize}${
          searchValue ? `&search=${searchValue}` : ""
        }`
      );
      set({
        orders: response.data.orders_response,
        orderCount: response.data.counter_orders,
      });
    } catch (error: any) {
      showNotification({
        message: error.response?.data?.detail || "An error occurred.",
        status: error.response?.status || 500,
        severity: error.severity,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  setSearchValue: (value: string) => set({ searchValue: value }),
  setKey: (key: string, value: string) => {
    set((state) => ({
      order: {
        ...state.order,
        [key]: value,
      },
    }));
  },

  setPage: async (page: number) => {
    set((state) => ({
      pagination: {
        ...state.pagination,
        page,
      },
    }));
  },

  setRowsPerPage: async (pageSize: number) => {
    set((state) => ({
      pagination: {
        ...state.pagination,
        pageSize,
      },
    }));
  },

  getOrderById: async (orderId: number) => {
    const { showNotification } = useNotificationStore.getState();
    try {
      set({ isLoading: true });
      const response = await api.get(
        `${process.env.REACT_APP_BASE_URL}/orders/${orderId}`
      );
      response.data.order_basic_info = {
        former_company: response.data.former_company,
        mobility: response.data.mobility,
      };
      response.data.order_schedule.order_supply_date = dayjs(response.data.order_schedule.order_supply_date)
      response.data.order_customer_payment.order_card_expired_date = dayjs(response.data.order_customer_payment.order_card_expired_date)
      set((state) => ({
        order: response.data
      }));
    } catch (error: any) {
      showNotification({
        message: error.response?.data?.detail || "An error occurred.",
        status: error.response?.status || 500,
        severity: error.severity,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  updateOrder: async (orderId: number, order: any) => {
    const { showNotification } = useNotificationStore.getState();
    try {
      set({ isLoading: true });
      const response = await api.put(
        `
        ${process.env.REACT_APP_BASE_URL}/orders/edit_order/${orderId}
        `,
        order
      );
      if (response.status === 200) {
        showNotification({
          message: "Update order successfully!",
          status: response.statusText,
          severity: response.status,
        });
      }
    } catch (error: any) {
      showNotification({
        message: error.response?.data?.detail || "An error occurred.",
        status: error.response?.status || 500,
        severity: error.severity,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  closeOrder: async (orderId: number) => {
    const { showNotification } = useNotificationStore.getState();
    try {
      set({ isLoading: true });
      const response = await api.put(`
        ${process.env.REACT_APP_BASE_URL}/orders/close_order/${orderId}
        `);

      if (response.status === 200) {
        showNotification({
          message: "Close order successfully!",
          status: response.statusText,
          severity: response.status,
        });
      }
    } catch (error: any) {
      showNotification({
        message: error.response?.data?.detail || "An error occurred.",
        status: error.response?.status || 500,
        severity: error.severity,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default ordersListStore;
