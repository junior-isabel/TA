<template>
 <main role="main">
   <section class="calendario">
    <table>
      <caption>
        <div>
          <label for="backMonth" @click="backMonth">
            <svg width="25" height="25" viewBox="0 0 25 25">
              <path d="M19,0 L6.5,12.5 L19,25" fill="transparent" stroke="#000" stroke-width="1"/>
            </svg>
          </label>
          <label>{{currentDate | DateNow}}</label>
          <label for="nextMonth" @click="nextMonth">
            <svg width="25" height="25" viewVox="0 0 25 25">
            <path d="M6.5,0 L19,12.5 L6.5,25" fill="transparent" stroke="#000" stroke-width="1"/>
            </svg>
          </label>
        </div>
      </caption>
      <thead>
        <tr>
          <th v-for="(day, index) in dayWeek" :key="index">{{day}}</th>
        </tr>
      </thead>
        <tbody>
          <tr v-for="(week, index) in date" :key="index">
            <td :class="{
              notMonth: day.month !== currentDate.month,
              'date-now': day.month === nowDate.month && day.date === nowDate.date && currentDate.year === nowDate.year ? true:  false
              }"
            v-for="(day, index2) in week" :key="index2"
            @click="() => setCheckout(day)"
            >{{day.date}}
            <label class="hour">0</label>
            <span class="progress">
                <span class="fragment-progress" style="width: 4%"></span>
                <span  class="fragment-progress" style="width: 30%"></span>
                <span class="fragment-progress" style="width: 40%"></span>
                <span class="fragment-progress" style="width: 12%"></span>
                <span class="fragment-progress" style="width: 8%"></span>
            </span>
            </td>
          </tr>
        </tbody>
    </table>
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
  data () {
    const d = new Date()
    return {
      checkout: '',
      nowDate: {
        date: d.getDate(),
        year: d.getFullYear(),
        month: d.getMonth()
      },
      currentDate: {
        day: d.getDay(),
        date: d.getDate(),
        year: d.getFullYear(),
        month: d.getMonth()
      },
      dayWeek: [
          'dom','seg', 'ter','qua','qui','sex','sáb'
        ],
        months: ['jan','fev','mar','abril','maio','jun','jul','set','out','nov','dez']
    }
  },
  computed: {
    date () {
      const month = []
      const d = new Date(this.currentDate.year, this.currentDate.month, 1)
      d.setDate(1)
      const day = d.getDay() - 1
      d.setDate(0)
      d.setDate(d.getDate() - day)
      let count = 0;
      for(let i = 0; i < 6; i++) {
        month[i] = []
        for(let j = 0; j < 7; j++) {
          d.setDate(d.getDate() + count)
          month[i].push({date: d.getDate(), month: d.getMonth()})
          count = 1
        }
      }
      return month
    }
  },
  filters: {
    DateNow (value) {
      const months = ['jan','fev','mar','abril','maio','jun','jul','ago','set','out','nov','dez']
      const d = new Date(value.year, value.month, value.date)
      return  months[d.getMonth()] +' ' + d.getFullYear()
    }
  },
  methods: {
    navigate () {
      this.$router.push({name: 'checkout', params: {date: this.checkout.date, object: this.checkout }})
    },
    setCheckout (value) {
      this.checkout = value
    },
    nextMonth () {
      this.currentDate.month++
      const d = new Date(this.currentDate.year, this.currentDate.month, 1)
      this.currentDate.date = d.getDate()
      this.currentDate.month = d.getMonth()
      this.currentDate.year = d.getFullYear()
      this.currentDate.day = d.getDay()
    },
     backMonth () {
      this.currentDate.month--
      const d = new Date(this.currentDate.year, this.currentDate.month, 1)
      this.currentDate.date = d.getDate()
      this.currentDate.month = d.getMonth()
      this.currentDate.year = d.getFullYear()
      this.currentDate.day = d.getDay()
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
.calendario {
  width: 380px
}
table tbody .notMonth {
  color: #dadada;
  cursor: not-allowed;
}
table tbody .date-now {
  color: #f00;
}
table caption  > div{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
}
table caption div label {
  cursor: pointer;
  align-self: flex-start;
  text-align: center;
  padding: .5rem;
  border-radius: 3px;
}
table thead th, table tbody td {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
table thead th {
  color: rgb(49, 49, 226);
}
table tbody td{
  position: relative;
  font-size: 1.5rem;
  border-radius: 3px;
}
table tbody td .hour {
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: .85rem;
}
table tbody tr td > .progress {
  position: absolute;
  display: block;
  bottom: -4px;
  left: 0;
  width: 95%;
}
table tbody td .progress .fragment-progress {
  background: red;
  margin: 0;
  height: 2px;
  display: inline-block;
  box-sizing: border-box;
}
table tbody td .progress span:first-child {
  margin-left: 0;
} table tbody td .progress span:last-child {
  margin-right: 0;
}
table tbody td:hover, table caption div label:active {
  background-color: rgba(0,0,0,.4)
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