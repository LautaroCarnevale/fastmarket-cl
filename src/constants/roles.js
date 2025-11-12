export const ROLES = {
    USER: 'user',
    VENDOR_STAFF: 'vendor_staff',
    DRIVER: 'driver',
    ADMIN: 'admin',
}

export const ORDER_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PREPARING: 'preparing',
    READY_FOR_PICKUP: 'ready_for_pickup',
    PICKED_UP: 'picked_up',
    ON_THE_WAY: 'on_the_way',
    DELIVERED: 'delivered',
    CANCELED: 'canceled',
}

export const ROLE_ROUTES = {
    [ROLES.USER]: '/marketplace',
    [ROLES.VENDOR_STAFF]: '/vendor/panel',
    [ROLES.DRIVER]: '/driver/panel',
    [ROLES.ADMIN]: '/admin/panel',
}
