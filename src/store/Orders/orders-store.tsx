import { create } from "zustand";
import api from "../../api";
import useNotificationStore from "../Notification/notification-store";

interface IOrdarsState {
  orders: any[];
  orderCount: number;
  isLoading: boolean;
  searchValue: string;
  order: {
    order_type: string;
    package_name: string;
  };
  pagination: any;
}

const ordersStore = create<IOrdarsState>((set) => ({
  orders: [],
  isLoading: false,
  searchValue: "",
  orderCount: 0,
  order: {
    order_type: "",
    package_name: "",
  },
  pagination: {
    pageSize: 10,
    page: 0,
  },

  getOrders: async (page: number = 0, limit: number = 50) => {
    const { showNotification } = useNotificationStore.getState();
    try {
      set({ isLoading: true });
      const { searchValue, pagination } = ordersStore.getState();
      const response = await api.post(
        `${process.env.REACT_APP_BASE_URL}/orders/package_types?page=${
          pagination.page + 1
        }&limit=${pagination.pageSize}&search=${searchValue}`
      );
      set({
        orders: response.data.orders_packages_types_resposne,
        orderCount: response.data.counter_orders_packages,
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

  addOrderType: async () => {
    const { showNotification } = useNotificationStore.getState();
    try {
      set({ isLoading: true });
      const { order } = ordersStore.getState();
      const response = await api.post(
        `
        ${process.env.REACT_APP_BASE_URL}/orders/package_types/add_type
        `,
        order
      );
      if (response.status === 200) {
        showNotification({
          message: "Create order successfully!",
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

  getOrderById: async (id: number) => {
    const { showNotification } = useNotificationStore.getState();
    try {
      set({ isLoading: true });
      const response = await api.get(
        `${process.env.REACT_APP_BASE_URL}/orders/package_types/${id}`
      );
      const { order_type, package_name } = response.data;

      set((state) => ({
        order: {
          ...state.order,
          order_type,
          package_name,
        },
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

  updateOrder: async (id: number) => {
    const { showNotification } = useNotificationStore.getState();
    try {
      set({ isLoading: true });
      const { order } = ordersStore.getState();
      const response = await api.put(
        `
        ${process.env.REACT_APP_BASE_URL}/orders/package_types/edit_type/${id}
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

  deleteOrder: async (id: number) => {
    const { showNotification } = useNotificationStore.getState();
    try {
      set({ isLoading: true });
      const response = await api.delete(`
        ${process.env.REACT_APP_BASE_URL}/orders/package_types/delete_type/${id}
        `);

      if (response.status === 200) {
        showNotification({
          message: "Delete order successfully!",
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

export default ordersStore;
