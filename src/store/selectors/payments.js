import { get, defaultTo } from "lodash";

const getPayments = (state, settings = {}) => {
  try {
    const paymentsList = get(state, "payments.paymentsList");

    if (!paymentsList) {
      return [];
    }

    const { data, isLoaded, isLoading, isError } = paymentsList;

    if (settings.trackFlags && (isError || isLoading || !isLoaded)) return [];

    if (!Array.isArray(data)) {
      return [];
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};

const getPayment = (state, paymentUuid, settings = {}) => {
  try {
    const paymentsList = get(state, "payments.paymentsList");

    if (!paymentsList) {
      return null;
    }

    const { data, isLoaded, isLoading, isError } = paymentsList;

    if (settings.trackFlags && (isError || isLoading || !isLoaded)) return null;

    if (!Array.isArray(data)) {
      return null;
    }

    return data.find(payment => String(payment.uuid) === String(paymentUuid));
  } catch (error) {
    console.error(error);
  }
};

const getPaymentsFlags = state => {
  try {
    const paymentsList = get(state, "payments.paymentsList");

    if (!paymentsList) {
      return {};
    }
    return {
      isLoading: paymentsList.isLoading,
      isLoaded: paymentsList.isLoaded,
      isError: paymentsList.isError
    };
  } catch (error) {
    console.error(error);
  }
};

const isPaymentLoading = state => payment => {
  try {
    const loadingUuids = defaultTo(get(state, "payments.loadingUuids", []));

    return loadingUuids.some(uuid => uuid === get(payment, "uuid"));
  } catch (error) {
    console.error(error);
  }
};

export default { getPayments, getPaymentsFlags, isPaymentLoading, getPayment };
