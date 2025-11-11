<script setup>

const props = defineProps({
    class: { default: '' },
    variant: {
        default: 'default',
        validator: v =>
            ['default', 'secondary', 'outline', 'ghost', 'link', 'danger'].includes(v)
    },
    size: {
        type: String,
        default: 'md',
        validator: s => ['xs', 'sm', 'md', 'lg'].includes(s)
    },
    disabled: { default: false },
    loading: { default: false },
    fullWidth: { default: false },
    type: { default: 'button' }
})

const base = `font-medium rounded-md transition-all duration-200 cursor-pointer
disabled:cursor-not-allowed flex justify-center items-center gap-2 
focus:outline-none shadow-soft disabled:opacity-60`

const variants = {
    default:
        'bg-naranjaMedio text-blanco hover:bg-naranjaAlto active:bg-naranjaBajo focus-visible:ring-2 focus-visible:ring-naranjaMedio',
    secondary:
        'bg-crema text-grisOscuro border border-grisMedio hover:bg-crema/80 active:bg-crema/70',
    outline:
        'border-2 border-naranjaMedio text-naranjaMedio hover:bg-naranjaMedio hover:text-blanco transition-colors',
    ghost:
        'text-naranjaMedio hover:bg-naranjaMedio/10 active:bg-naranjaMedio/20 transition',
    link:
        'text-naranjaMedio underline underline-offset-4 hover:text-naranjaAlto px-0 py-0',
    danger:
        'bg-rojoError text--blanco hover:bg-red-600 active:bg-red-700 focus-visible:ring-2 focus-visible:ring-rojoError]'
}

const sizes = {
    xs: 'px-3 py-1 text-xs',
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-5 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
}
</script>

<template>
    <button :type="type"
            :disabled="disabled || loading"
            :class="[
                base,
                variants[variant],
                sizes[size],
                fullWidth ? 'w-full' : '',
                props.class
            ]">
        <span v-if="loading"
              class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
        <slot />
    </button>
</template>
