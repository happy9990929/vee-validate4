<template>
  <input
    :id="id"
    v-model="inputValue"
    :name="name"
    :type="type"
    :placeholder="placeholder"
    :maxlength="maxlength"
    class="form-control"
    :class="{ 'is-invalid': errorMessage }"
  />
  <div class="invalid-feedback">{{ errorMessage }}
  </div>
</template>

<script>
import { useField } from 'vee-validate';
import { watch } from 'vue';

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    maxlength: {
      type: Number,
      default: Infinity,
    },
  },
  setup(props) {
    let { value: inputValue, errorMessage } = useField(
      props.name,
      undefined,
      {
        initialValue: props.modelValue,
      }
    );

    watch(
      () => props.modelValue,
      val => {
        inputValue.value = val;
      }
    );

    return {
      inputValue,
      errorMessage,
    };
  },
};
</script>
