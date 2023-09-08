const API_KEY = "http://localhost:8000";

const purchasesUrl = `${API_KEY}/api/v1/client_purchases/`;
const partnersListUrl = `${API_KEY}/api/v1/client_partners/`;
const partnersListAll = `${API_KEY}/api/v1/partners/`;

const ordersUrl = `${API_KEY}/api/v1/partner_purchases_order/`;
const sendActUrl = `${API_KEY}/api/v1/send_act/`;
const sendDocumentUrl = `${API_KEY}/api/v1/send_document/`;

const registrationCodeUrl = `${API_KEY}/auth/send_code/`;
const registrationClientUrl = `${API_KEY}/auth/registration_client/`;
const registrationPartnerUrl = `${API_KEY}/auth/registration_partner/`;
const loginUrl = `${API_KEY}/auth/token/login/`;

const clientUrl = `${API_KEY}/api/v1/client/`;
const partnerUrl = `${API_KEY}/api/v1/partner/`;

const remove_addUrl = `${API_KEY}/api/v1/add_or_remove_client/`;
const addChequeUrl = `${API_KEY}/api/v1/add_cheque/`;
const getClientsListUrl = `${API_KEY}/api/v1/partner_clients/`;
const withdrawBonusesUrl = `${API_KEY}/api/v1/withdraw_bonus/`;
const refundUrl = `${API_KEY}/api/v1/add_refund/`;

const notificationUrl = `${API_KEY}/api/v1/get_notifications/`;
const removeNotificationUrl = `${API_KEY}/api/v1/delete_notification/`;

const addNotificationClientUrl = `${API_KEY}/api/v1/add_notification_client/`;

export {
  purchasesUrl,
  partnersListUrl,
  partnersListAll,
  registrationCodeUrl,
  registrationClientUrl,
  registrationPartnerUrl,
  loginUrl,
  clientUrl,
  partnerUrl,
  remove_addUrl,
  addChequeUrl,
  getClientsListUrl,
  withdrawBonusesUrl,
  refundUrl,
  notificationUrl,
  removeNotificationUrl,
  addNotificationClientUrl,
  ordersUrl,
  sendActUrl,
  sendDocumentUrl,
};
