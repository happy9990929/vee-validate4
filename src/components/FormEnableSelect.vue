<template>
  <div>
    <select
      v-model="selectValue"
      :name="name"
      class="form-select pe-3"
      :class="status"
      @change="updateValue"
    >
      <option v-if="!isNewebPay" value="true">啟用</option>
      <option v-if="isReceivePayment" value="fail">失敗</option>
      <option v-if="isNewebPay" value="newebPay">藍新金流</option>
      <option value="false">停用</option>
    </select>
    <div class="invalid-feedback">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { useField } from 'vee-validate';
import { computed, watch } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Boolean],
      default: '',
    },
    isReceivePayment: {
      type: Boolean,
      default: false,
    },
    isNewebPay: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const store = useStore();

    const updateValue = e => {
      const targetValue = e.target.value;
      emit('update:modelValue', targetValue);
    };

    const { value: selectValue, errorMessage } = useField(
      props.name,
      undefined,
      {
        initialValue: props.modelValue,
      }
    );

    const status = computed(() => {
      if (selectValue.value === 'true') {
        return 'btn-outline-success';
      } else if (selectValue.value === 'fail') {
        return 'btn-danger';
      } else {
        return '';
      }
    });

    watch(
      () => props.modelValue,
      val => {
        selectValue.value = val;
        store.dispatch('member/setSaveDisabled', true);
      }
    );

    return {
      selectValue,
      errorMessage,
      updateValue,
      status,
    };
  },
};
</script>
