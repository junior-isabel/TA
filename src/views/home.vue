<template>
 <main role="main">
   <section class="calendario">
   <app-calendar @selectDate="setCheckout"/>
   <div class="controller" v-show="checkout">
      <button @click="navigate"> + </button>
    </div>
   </section>
   <section class="checkout">
     <router-view></router-view>
   </section>
 </main>
</template>
<script>
export default {
  name: 'view-home',
  components: {
    'app-calendar': require('@/components/widgets/calendar').default
  },
  data () {
    return {
      checkout: '',
    }
  },
  methods: {
    navigate () {
      this.$router.push({name: 'checkout', params: {date: this.checkout.date, object: this.checkout }})
    },
    setCheckout (value) {
      this.checkout = value
    }
  }
}
</script>
<style scoped>
main {
  display: flex;
}
.checkout {
  flex-grow: 2;
  flex-shrink: 1;
}
div.controller {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 1rem;
}
div.controller button {
  width: 60px;
  height: 60px;
  padding: 0;
  line-height: 60px;
  font-size: 3.8rem;
  color: #99f;
  border-radius: 100%;
  border-style: none;
  outline-style: none;
  background: transparent;
  box-shadow: 0 0 10px -4px #000, inset 0 0 12px -2px #000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
div.controller button:active {
  box-shadow: 0 0 10px -4px #000, inset 0 0 4px -2px #000;
  font-size: 3rem;
  transition: all 30ms linear 0s;
}
div.controller button a {
  text-decoration: none;
}
</style>