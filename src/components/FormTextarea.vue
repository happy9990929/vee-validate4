<template>
  <div>
    <textarea
      :id="id"
      v-model="inputValue"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      class="form-control"
      :class="{ 'is-invalid': errorMessage, 'num-space': num }"
      :readonly="readonly"
      :maxlength="maxlength"
      :style="`height: ${rowHeight}px`"
      @input="updateValue"
      @keydown="enterRow"
    ></textarea>
    <div class="invalid-feedback">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { useField } from 'vee-validate';
import { watch, ref } from 'vue';

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
    inputGroup: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    num: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const updateValue = e => {
      const targetValue = e.target.value;

      emit('update:modelValue', targetValue);
    };

    const rowHeight = ref(30);

    let { value: inputValue, errorMessage } = useField(props.name, undefined, {
      initialValue: props.modelValue,
    });

    watch(
      () => props.modelValue,
      val => {
        if (props.name === 'slogan') {
          let values = val === null ? '' : val.split('\n');
          if (values.length > 3) {
            values = values.slice(0, 3);
          }
          const message = values.join('\n');
          inputValue.value = message;
        }
      }
    );

    const enterRow = e => {
      if (e.keyCode === 13) {
        rowHeight.value = 72;
      }
    };

    return {
      inputValue,
      errorMessage,
      updateValue,
      enterRow,
      rowHeight,
    };
  },
};
</script>
