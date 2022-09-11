<template>
  <div class="demo-collapse">
    <el-collapse v-model="activeName" accordion>
      <template v-for="paymentDetail in paymentMethods">
        <el-collapse-item class="accordion-payment-methods" :title="paymentDetail.label" :name="paymentDetail.id">
          <template #title>
            <span class="flex-order-2 ml-12">{{ paymentDetail.label }}</span> <span class="flex flex-order-3"><img
                :src="(paymentDetail.img)" /></span>
          </template>

          <div class="divider" />

          <div v-if="paymentDetail.id === '1'" class="fpx-list-wrap">
            <template v-for="bankDetail in paymentDetail.options">
              <div :class="'fpx-wrap ' + (props.paymentMethod ==='FPX' && props.bankCode === bankDetail.name ? 'payment-is-selected' : '')"
                @click="() => { props.onPaymentSelect('FPX', bankDetail.name) }">
                <img height="32" width="32" :alt="bankDetail.label" :src="bankDetail.img" />
                <div>{{ bankDetail.label }}</div>
              </div>
            </template>
          </div>

          <div v-if="paymentDetail.id === '2'">
            <template v-for="ewalletDetail in paymentDetail.options">
              <div
                :class="'flex align-center ewallet-wrap ' + (props.paymentMethod === ewalletDetail.name ? 'payment-is-selected' : '')"
                @click="() => { props.onPaymentSelect(ewalletDetail.name) }">
                <img height="40" width="40" :alt="ewalletDetail.label" :src="(ewalletDetail.img)" />
                <span class="ml-12">{{ ewalletDetail.label }}</span>
              </div>
            </template>
          </div>
        </el-collapse-item>
      </template>
    </el-collapse>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import * as bankList from '../../data/fpx.json';
import * as eWalletList from '../../data/ewallet.json';

const props = defineProps({
  onPaymentSelect: Function,
  paymentMethod: String,
  bankCode: String,
});

const paymentMethods = [
  {
    id: '1',
    label: 'Online Banking',
    img: '/payment/fpx.png',
    options: bankList.banks,
  },
  {
    id: '2',
    label: 'e-Wallets',
    img: '/payment/ewallet.png',
    options: eWalletList.ewallet,
  }
]

const activeName = ref(null)
</script>

<style scoped>
.accordion-payment-methods {
  background-color: #fff;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  border: 1px #ddd solid;
}

.divider {
  border-top: 1px #ddd solid;
}

.fpx-list-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1em;
  padding-top: 5px;
  margin-top: 5px;
}

.fpx-wrap {
  padding: 5px;
  background: white;
  border: 1px solid #EEE;
  text-align: center;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.ewallet-wrap {
  border: 1px solid #EEE;
  padding: 5px;
  border-radius: 4px;
  margin: 8px;
}

.payment-is-selected {
  color: #2098ff;
  border-color: #2098ff;
}

.flex-order-2 {
  order: 2;
}

.flex-order-3 {
  order: 3;
  margin: 0 8px 0 auto;
}
</style>