<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { Form, Field, ErrorMessage } from "vee-validate";
import { ROLES } from "../../constants/roles";
import Input from "../../components/ui/Input.vue";
import Button from "../../components/ui/Button.vue";
import { useAuth } from "../../composables/useAuth";
import { loginSchema } from "../../validations/auth/loginSchema";

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
            selectedType: ROLES.ADMIN,
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
            setFieldError("__root__", "Ocurrió un error al iniciar sesión. Intenta nuevamente.");
        }
    }
}
</script>

<template>
    <div class="max-w-md w-full  py-8 border border-grisMedio/20">
        <div class="text-center mb-8">
            <div class="w-16 h-16 bg-naranjaMedio rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fa-solid fa-shield-halved text-3xl text-blanco"></i>
            </div>
            <h1 class="text-3xl font-bold text-grisOscuro mb-2">Panel de Administración</h1>
            <p class="text-grisMedio">
                Acceso exclusivo para administradores
            </p>
        </div>

        <Form @submit="onSubmit"
              :validationSchema="loginSchema"
              class="flex flex-col gap-4">
            <Field name="email"
                   v-slot="{ field, errorMessage }">
                <Input label="Email de Administrador"
                       type="email"
                       placeholder="admin@fastmarket.com"
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
                          class="text-rojoError text-sm bg-red-50 p-3 rounded-md" />

            <Button type="submit"
                    variant="default"
                    size="lg"
                    :loading="auth.loading.value"
                    fullWidth
                    class="mt-2">
                <i class="fa-solid fa-right-to-bracket mr-2"></i>
                Acceder al Panel
            </Button>
        </Form>

        <div class="text-center mt-6">
            <RouterLink to="/"
                        class="text-grisMedio hover:text-naranjaMedio transition-all text-sm flex items-center justify-center gap-2">
                <i class="fa-solid fa-arrow-left"></i>
                Volver al sitio principal
            </RouterLink>
        </div>

    </div>
</template>
