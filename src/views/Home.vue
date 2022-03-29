<template>
  <div class="form-box">
    <div>
      <div class="form-group">
        <label for="userName">姓名：</label>
        <FormInput
        :id="'userName'"
        v-model="memberInfo.data.name"
        :name="'userName'"
        :type="'text'"
        :placeholder="'輸入'"
        />
      </div>
      <div class="form-group">
        <label for="password">密碼：</label>
        <FormInput
        :id="'password'"
        v-model="password.password"
        :name="'password'"
        :type="'password'"
        :placeholder="'輸入'"
        />
      </div>
      <div class="form-group">
        <label for="confirmPassword">確認密碼：</label>
        <FormInput
        :id="'confirmPassword'"
        v-model="password.confirmPassword"
        :name="'confirmPassword'"
        :type="'password'"
        :placeholder="'輸入'"
        />
      </div>
      <div class="form-group">
        <label for="email">e-mail：</label>
        <FormInput
        :id="'email'"
        v-model="memberInfo.data.email"
        :name="'email'"
        :type="'text'"
        :placeholder="'輸入'"
        />
      </div>
      <div>
        <div v-for="(item, idx) in fields" :key="item.url" class="form-group">
          <label :for="`link${idx}`">link{{idx+1}}：</label>
          <FormInput
          :id="`link[${idx}]`"
          :name="`link[${idx}].url`"
          :type="'text'"
          :placeholder="'輸入'"
          />
          <button type="button" @click="remove(idx)">remove</button>
        </div>
        <button type="button" @click="push({url: ''})">add</button>

      </div>
    </div>
  </div>
  <div>
    取值：
    {{ values }}
  </div>
</template>

<script>
import { reactive, inject } from 'vue';
import { useForm, useFieldArray } from 'vee-validate';
import axios from 'axios';

export default {
  setup() {
    const schema = inject('schema');

    const { values } = useForm({
      validationSchema: schema,
    });

    const { replace, remove, push, fields } = useFieldArray('link');

    const password = reactive({
      password: '',
      confirmPassword: '',
    });

    const publicPath = process.env.BASE_URL;

    const getMemberInfo = () => {
      return axios.get(`${publicPath}data/info.json`);
    };

    let memberInfo = reactive({
      data: {}
    });

    getMemberInfo().then(res => {
      memberInfo.data = res.data;
      replace(memberInfo.data.link);
    });

    return {
      password,
      memberInfo,
      values,
      remove, push, fields
    }
  }
}
</script>

<style lang="scss" scoped>
.form-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.form-group {
  margin: 20px 0;
  display: flex;
}
</style>