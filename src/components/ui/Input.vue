<script setup>
import { computed } from 'vue'

const props = defineProps({
    label: String,
    type: {
        type: String,
        default: 'text'
    },
    name: String,
    placeholder: String,
    modelValue: [String, Number],
    errorMessage: String,
    class: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    }

})

const emit = defineEmits(['update:modelValue'])

const inputClass = computed(() => `
  w-full px-4 py-2 rounded-md border 
  ${props.errorMessage ? 'border-red-500' : 'border-gray-300'}
  focus:outline-none focus:ring-2 focus:ring-azulBajo 
  text-grisAlto placeholder:text-grisMedio bg-white
  disabled:opacity-60 disabled:cursor-not-allowed
  ${props.class}
`)
</script>

<template>
    <div class="flex flex-col gap-1 w-full">
        <label v-if="label"
               :for="name"
               class="text-sm font-medium text-grisMedio">{{ label }}</label>
        <input :id="name"
               :name="name"
               :type="type"
               :placeholder="placeholder"
               :disabled="disabled"
               :class="inputClass"
               :value="modelValue"
               @input="emit('update:modelValue', $event.target.value)" />
        <p v-if="errorMessage"
           class="text-red-500 text-xs mt-1">{{ errorMessage }}</p>
    </div>
</template>
