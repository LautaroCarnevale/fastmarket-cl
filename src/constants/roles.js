export const ROLES = {
    USER: 'user',
    VENDOR: 'vendor',
    VENDOR_STAFF: 'vendor_staff',
    DRIVER: 'driver',
    ADMIN: 'admin',
}

export const ROLE_ROUTES = {
    [ROLES.USER]: '/vendors',
    [ROLES.VENDOR]: '/vendor/panel',
    [ROLES.DRIVER]: '/driver/panel',
    [ROLES.ADMIN]: '/admin/panel',
}
