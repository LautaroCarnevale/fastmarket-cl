<script setup>
import { computed } from 'vue'

const props = defineProps({
    label: String,
    name: String,
    placeholder: String,
    modelValue: String,
    errorMessage: String,
    rows: {
        type: Number,
        default: 3
    },
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

const textareaClass = computed(() => `
  w-full px-4 py-2 rounded-md border 
  ${props.errorMessage ? 'border-red-500' : 'border-gray-300'}
  focus:outline-none focus:ring-2 focus:ring-orange-500 
  text-grisAlto placeholder:text-grisMedio bg-white
  disabled:opacity-60 disabled:cursor-not-allowed resize-none
  ${props.class}
`)
</script>

<template>
    <div class="flex flex-col gap-1 w-full">
        <label v-if="label"
               :for="name"
               class="text-sm font-medium text-gray-700">{{ label }}</label>
        <textarea :id="name"
                  :name="name"
                  :placeholder="placeholder"
                  :disabled="disabled"
                  :rows="rows"
                  :class="textareaClass"
                  :value="modelValue"
                  @input="emit('update:modelValue', $event.target.value)"></textarea>
        <p v-if="errorMessage"
           class="text-red-500 text-xs mt-1">{{ errorMessage }}</p>
    </div>
</template>
