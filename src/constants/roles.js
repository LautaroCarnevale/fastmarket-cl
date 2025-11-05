export const ROLES = {
    USER: 'user',
    VENDOR_STAFF: 'vendor_staff',
    DRIVER: 'driver',
    ADMIN: 'admin',
}

export const ROLE_ROUTES = {
    [ROLES.USER]: '/marketplace',
    [ROLES.VENDOR_STAFF]: '/vendor/panel',
    [ROLES.DRIVER]: '/driver/panel',
    [ROLES.ADMIN]: '/admin/panel',
}
