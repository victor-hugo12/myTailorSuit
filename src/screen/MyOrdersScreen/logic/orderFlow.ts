// myTailorSuit/screen/MyOrdersScreen/logic/orderFlow.ts
export const ORDER_STATE_LABELS: Record<OrderStatus, string> = {
  PENDIENTE_APROBACION_SASTRE: "pending_tailor_approval",
  PENDIENTE_COTIZACION: "pending_quote",
  COTIZADO: "quoted",
  ESPERANDO_PAGO: "waiting_payment",
  ANTICIPO_PAGADO: "deposit_paid",
  EN_CONFECCIÓN: "in_production",
  CONTROL_CALIDAD: "quality_control",
  LISTO_ENVÍO: "ready_to_ship",
  ENTREGADO: "delivered",
  CANCELADO_CLIENTE: "canceled_by_client",
  CANCELADO_SASTRE: "canceled_by_tailor",
};

export type OrderStatus =
  | "PENDIENTE_APROBACION_SASTRE"
  | "PENDIENTE_COTIZACION"
  | "COTIZADO"
  | "ESPERANDO_PAGO"
  | "ANTICIPO_PAGADO"
  | "EN_CONFECCIÓN"
  | "CONTROL_CALIDAD"
  | "LISTO_ENVÍO"
  | "ENTREGADO"
  | "CANCELADO_CLIENTE"
  | "CANCELADO_SASTRE";

export const ORDER_STATE_COLORS: Record<OrderStatus, string> = {
  PENDIENTE_APROBACION_SASTRE: "#FFA500",
  PENDIENTE_COTIZACION: "#FFB84D",
  COTIZADO: "#1E90FF",
  ESPERANDO_PAGO: "#1E90FF",
  ANTICIPO_PAGADO: "#00BFFF",
  EN_CONFECCIÓN: "#0B214A",
  CONTROL_CALIDAD: "#8A2BE2",
  LISTO_ENVÍO: "#32CD32",
  ENTREGADO: "#228B22",
  CANCELADO_CLIENTE: "#B91C1C",
  CANCELADO_SASTRE: "#B91C1C",
};
