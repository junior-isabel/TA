<template>
  <main role="calendar" class="calendar">
    <table>
      <caption>
        <div>
          <label for="backMonth" @click="() =>back(-1)">
            <svg width="25" height="25" viewBox="0 0 25 25">
              <path d="M19,0 L6.5,12.5 L19,25" fill="transparent" stroke="#000" stroke-width="1"/>
            </svg>
          </label>
          <label @click="toggleCalendar" class="display-date">{{currentDate | DateNow}}</label>
          <label for="nextMonth" @click="() => next(1)">
            <svg width="25" height="25" viewVox="0 0 25 25">
            <path d="M6.5,0 L19,12.5 L6.5,25" fill="transparent" stroke="#000" stroke-width="1"/>
            </svg>
          </label>
        </div>
      </caption>
      <calendar-month v-if="ActiveCalendar.localeCompare('month') === 0"
      :dayWeek="dayWeek"
      :currentDate="currentDate"
      :checkout="checkout"
      :nowDate="nowDate"
      @setCheckout="setCheckout"
      />
      <calendar-year v-else :currentYear="currentDate.year" @setYear="setYear"/>
    </table>
  </main>
</template>
<script>
export default {
  name: 'widget-calendar',
  components: {
    'calendar-month': require('./month').default,
    'calendar-year': require('./year').default
  },
  data () {
    const d = new Date()
    return {
      ActiveCalendar: 'month',
      checkout: {
        date: null,
        month: null
      },
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
  
  filters: {
    DateNow (value) {
      const months = ['jan','fev','mar','abril','maio','jun','jul','ago','set','out','nov','dez']
      const d = new Date(value.year, value.month, value.date)
      return  months[d.getMonth()] +' ' + d.getFullYear()
    }
  },
  methods: {
    setCheckout (value) {
      this.checkout = value
      this.$emit('selectDate', value)
    },
    toggleCalendar () {
      if(this.ActiveCalendar.localeCompare('month') === 0) {
        this.ActiveCalendar = 'year'
      } else {
        this.ActiveCalendar = 'month'
      }
    },
    next (value) {
      if(this.ActiveCalendar.localeCompare('month') === 0) {
        this.goMonth(value)
      } else {
        this.goYear(value)
      }
    },
     back (value) {
      if(this.ActiveCalendar.localeCompare('month') === 0) {
        this.goMonth(value)
      } else {
        this.goYear(value)
      }
    },
    goMonth (value) {
      if(value < 0)
      this.currentDate.month-- 
      else if (value > 0) {
        this.currentDate.month++
      }
      const d = new Date(this.currentDate.year, this.currentDate.month, 1)
      this.currentDate.date = d.getDate()
      this.currentDate.month = d.getMonth()
      this.currentDate.year = d.getFullYear()
      this.currentDate.day = d.getDay()
      this.checkout =  {data: null, month: null}
       this.$emit('selectDate', '')
    },
    goYear (value) {
      if(value < 0)
      this.currentDate.year-- 
      else if (value > 0) {
        this.currentDate.year++
      }
      const d = new Date(this.currentDate.year, this.currentDate.month, this.currentDate.date)
      this.currentDate.date = d.getDate()
      this.currentDate.month = d.getMonth()
      this.currentDate.year = d.getFullYear()
      this.currentDate.day = d.getDay()
      this.checkout =  {data: null, month: null}
      this.$emit('selectDate', '')

    },
    setYear(year) {
      this.currentDate.year = year
      this.goYear()
      this.ActiveCalendar = 'month'
    }
  }
}
</script>

<style scoped>
.calendar {
  width: 380px
}
table {
  padding: 0;
  border-collapse: collapse;
}
table caption  > div{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
table caption div label {
  cursor: pointer;
  align-self: flex-start;
  text-align: center;
  padding: .5rem;
  border-radius: 3px;
}
.display-date {
  font-size: 1.8rem;
  text-transform: uppercase;

}
table caption div label:active {
  background-color: rgba(0,0,0,.4)
}
</style>
