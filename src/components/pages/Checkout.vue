<template>
  <div class="page-wrap">
    <div class="payment-wrapper flex justify-center  align-center ">
      <img src="../../assets/icons/gggpay-logo-black.png" height="130" />
      <div class="ml-12">
        <div>MY SIDE BY SIDE SDN. BHD.</div>
        <div>202001038872</div>
        <div>0172782671 | leon@sidebyside.my</div>
      </div>
    </div>
    <div class="payment-wrapper grid-equal-child-width ">
      <el-card class="flex flex-d-col space-between">
        <div class="mb-12 mt-12 flex space-between">
          <div>
            <span class="payment-detail-label">Order Id</span>: <span>{{ orderDetail.billId }}</span>
          </div>
        </div>
        <el-divider />
        <template v-if="orderDetail.merchantOrderId">
          <div class="mb-12">
            <span class="payment-detail-label">Name</span>: <span>{{ orderDetail.name }}</span>
          </div>
          <div class="mb-12">
            <span class="payment-detail-label">Email</span>: <span>{{ orderDetail.email }}</span>
          </div>
          <div class="mb-12">
            <span class="payment-detail-label">Mobile Phone</span>: <span>{{ orderDetail.phone }}</span>
          </div>
        </template>
      </el-card>
      <el-card class="payment-method-wrapper">
        <div class="flex space-between">
          <div class="flex flex-d-col">
            <span>Total</span>
            <h2>RM {{ parseFloat(orderDetail.amount).toFixed(2) }}</h2>
          </div>
          <div class="flex flex-d-col ">
            <span class="payment-detail-label">Remaining Time</span>
            <span>{{ minuteLeft }}:{{ secondLeft }}</span>
          </div>
        </div>
        <p class="pay-with-label">Pay with:</p>
        <PaymentMethods :onPaymentSelect="onPaymentSelect" :paymentMethod="selectedPaymentMethod"
          :bankCode="bankCode" />
        <el-button type="primary mt-12 btn-pay-now" @click="onPayNow()">Pay Now</el-button>
      </el-card>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import PaymentMethods from '../molecules/PaymentMethods.vue';

// const baseUrl = 'http://localhost:8080';
const baseUrl = 'https://api.gggpay.org'

export default {
  data() {
    return {
      minuteLeft: 14,
      secondLeft: 59,
      // paymentMethods: [],
      selectedPaymentMethod: null,
      bankCode: null,
      orderDetail: {
        billId: '',
        merchantOrderId: null,
        amount: null,
        username: ""
      }
    };
  },
  methods: {
    onPaymentSelect(paymentId, bankCode = null) {
      console.log(paymentId);
      this.selectedPaymentMethod = paymentId;
      this.bankCode = bankCode;
    },
    async onPayNow() {
      console.log(this.selectedPaymentMethod);
      if (this.selectedPaymentMethod === null) {
        alert("Payment Method is mandatory");
        return;
      }
      const { orderId } = this.$route.query;
      let additionalInfo = {};
      if (this.selectedPaymentMethod === "FPX") {
        additionalInfo = {
          bankCode: this.bankCode
        }
      }
      const result = await axios.post(`${baseUrl}/gggpay/createPayment`, {
        routerName: "gggpay",
        controllerName: "createPayment",
        data: {
          order_id: orderId,
          paymentMethod: this.selectedPaymentMethod,
          ...additionalInfo
        }
      });
      alert(result.data.paymentUrl);
      window.location.href = result.data.paymentUrl;
    }
  },
  async mounted() {
    const paymentInterval = setInterval(() => {
      if (this.secondLeft > 0) {
        this.secondLeft -= 1;
      }
      else if (this.minuteLeft > 0) {
        this.minuteLeft -= 1;
        this.secondLeft = 59;
      }
      else if (this.minuteLeft === 0 && this.secondLeft === 0) {
        clearInterval(paymentInterval);
        window.location = "https://www.google.com";
      }
    }, 1000);
    const { orderId } = this.$route.query;
    // const result = await axios.post(`${baseUrl}/gggpay/getOrderDetail`, {
    //   routerName: "gggpay",
    //   controllerName: "getOrderDetail",
    //   data: {
    //     order_id: orderId
    //   }
    //   // data: encryptedAuthString,
    // });

    const result = { data: { message: null, redirectUrl: null, orderDetail: {}} };

    if (result.data.message) {
      alert(result.data.message);
    }

    if (result.data.redirectUrl) {
      window.location = result.data.redirectUrl;
    }

    const orderDetail = result.data.orderDetail;
    this.orderDetail = {
      billId: orderId,
      merchantOrderId: orderDetail.merchantOrderId,
      amount: orderDetail.money,
      name: orderDetail.customerName,
      email: orderDetail.customerEmail,
      phone: orderDetail.customerPhone,
    };
    console.log(result.data.orderDetail);
  },
  components: { PaymentMethods }
}

</script>

<style scoped>
.company-title {
  font-size: 20px;
  font-weight: 700;
}

.text-center {
  text-align: center;
}

.payment-amount {
  color: #ff804d;
  text-align: center;
}

.payment-wrapper {
  max-width: 60vw;
  margin: 20px auto;
}

@media only screen and (min-width: 600px) {
  .grid-equal-child-width {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

}


.payment-option-wrapper {
  border: 1px solid #ccc;
  border-radius: 16px;
  vertical-align: center;
  height: 100px;
}

.payment-option-wrapper.active {
  border: 1px solid #409eff;
}

.payment-option-wrapper img {
  height: 50%;
}

.radio-border-radius {
  margin-left: 20px;
  border-radius: 50%;
  background: white;
  border: 1px solid #409eff;
  width: 30px;
  height: 30px;
  position: relative;
}

.radio-border-radius.active label {
  position: absolute;
  border-radius: 50%;
  vertical-align: center;
  left: 25%;
  top: 25%;
  background: #409eff;
  width: 15px;
  height: 15px;
}

.payment-label {
  font-weight: 700;
}

.payment-description {
  color: #aaabbb;
}

.payment-method-wrapper {
  background: #fafafa;
}

.pay-with-label {
  margin-top: 30px;
  padding-top: 5px;
  color: #666;
  padding-bottom: 10px;
}

.payment-detail-label {
  font-weight: 700;
}

.btn-pay-now {
  width: 100%;
  padding: 20px;
}

@media only screen and (max-width: 600px) {
  .payment-wrapper {
    max-width: 100vw;
    flex-direction: column;
  }

}
</style>