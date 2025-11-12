<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { Form, Field, ErrorMessage } from "vee-validate";
import { ROLES } from "../constants/roles";
import Input from "../components/ui/Input.vue";
import Button from "../components/ui/Button.vue";
import { useAuth } from "../composables/useAuth";
import { loginSchema } from "../validations/loginSchema";

const selectedType = ref(ROLES.USER);
const auth = useAuth();

const form = ref({
    email: "",
    password: "",
});

async function onSubmit(values, { setErrors, setFieldError }) {
    setErrors({});
    try {
        const payload = {
            email: values.email,
            password: values.password,
            selectedType: selectedType.value,
        };

        await auth.login(payload);
    } catch (err) {
        if (err?.errors && typeof err.errors === "object") {
            setErrors(err.errors);
        } else if (Array.isArray(err?.message)) {
            setFieldError("__root__", err.message.join(" • "));
        } else if (typeof err?.message === "string") {
            setFieldError("__root__", err.message);
        } else {
            setFieldError("__root__", "Ocurrió un error al guardar. Intenta nuevamente.");
        }
    }
}

</script>

<template>
    <h1 class="text-2xl font-bold text-gray-900 mb-1">Iniciar Sesión</h1>
    <p class="text-gray-500 mb-6">
        Ingresa tus credenciales para acceder a tu cuenta
    </p>

    <div class="mb-6">
        <h3 class="text-sm font-medium text-gray-700 mb-2">Tipo de cuenta</h3>
        <div class="grid grid-cols-3 gap-3">
            <button @click="selectedType = ROLES.USER"
                    :class="[
                        'flex flex-col items-center justify-center p-3 border rounded-lg transition-all duration-200 cursor-pointer',
                        selectedType === ROLES.USER
                            ? 'border-azulBajo bg-azulBajo/10 text-azulBajo'
                            : 'border-gray-300 hover:border-gray-400 text-gray-600',
                    ]">
                <i class="fa-solid fa-user text-xl mb-1"></i>
                <span class="text-sm font-medium">Usuario</span>
            </button>

            <button @click="selectedType = ROLES.VENDOR_STAFF"
                    :class="[
                        'flex flex-col items-center justify-center p-3 border rounded-lg transition-all duration-200 cursor-pointer',
                        selectedType === ROLES.VENDOR_STAFF
                            ? 'border-azulBajo bg-azulBajo/10 text-azulBajo'
                            : 'border-gray-300 hover:border-gray-400 text-gray-600',
                    ]">
                <i class="fa-solid fa-store text-xl mb-1"></i>
                <span class="text-sm font-medium">Comercio</span>
            </button>

            <button @click="selectedType = ROLES.DRIVER"
                    :class="[
                        'flex flex-col items-center justify-center p-3 border rounded-lg transition-all duration-200 cursor-pointer',
                        selectedType === ROLES.DRIVER
                            ? 'border-azulBajo bg-azulBajo/10 text-azulBajo'
                            : 'border-gray-300 hover:border-gray-400 text-gray-600',
                    ]">
                <i class="fa-solid fa-truck text-xl mb-1"></i>
                <span class="text-sm font-medium">Repartidor</span>
            </button>
        </div>
    </div>

    <Form @submit="onSubmit"
          :validationSchema="loginSchema"
          class="flex flex-col gap-4">
        <Field name="email"
               v-slot="{ field, errorMessage }">
            <Input label="Email"
                   type="email"
                   placeholder="tu@email.com"
                   v-model="form.email"
                   v-bind="field"
                   :errorMessage="errorMessage" />
        </Field>

        <Field name="password"
               v-slot="{ field, errorMessage }">
            <Input label="Contraseña"
                   type="password"
                   placeholder="••••••••"
                   v-model="form.password"
                   v-bind="field"
                   :errorMessage="errorMessage" />
        </Field>

        <ErrorMessage name="__root__"
                      class="text-red-600 text-sm" />

        <Button type="submit"
                variant="default"
                size="md"
                :loading="auth.loading.value"
                fullWidth
                class="mt-2">
            Iniciar Sesión
        </Button>
    </Form>

    <div class="text-center mt-5 text-sm text-gray-600">
        <p>
            ¿No tienes cuenta?
            <RouterLink to="/register"
                        class="text-azulBajo font-medium hover:underline">
                Regístrate aquí
            </RouterLink>
        </p>
        <RouterLink to="/"
                    class="block mt-2 text-gray-500 hover:text-gray-700 transition-all">
            Volver al inicio
        </RouterLink>
    </div>
</template>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");
</style>
