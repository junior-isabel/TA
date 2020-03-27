<template>
  <main>
     <thead>
        <tr>
          <th v-for="(day, index) in dayWeek" :key="index">{{day}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, index) in date" :key="index">
          <template  v-for="(day, index2) in week">
             <td v-if="day.month == currentDate.month"
             :key="index2" :class="{
            notMonth: day.month !== currentDate.month,
            'date-now': day.month === nowDate.month && day.date === nowDate.date && currentDate.year === nowDate.year ? true:  false,
            'date-mark': day.date === checkout.date
            }"
          @click="$emit('setCheckout', day)"
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
           <td v-else
             :key="index2" class="notMonth"
          >{{day.date}}
          <label class="hour">0</label>
          </td>
          </template>
         
        </tr>
      </tbody>
  </main>
</template>
<script>
export default {
  name: 'calendar-month',
  props: {
    currentDate: {
      type: Object
    },
    nowDate: {
      type: Object
    },
    dayWeek: {
      type: Array,
      default: () => []
    },
    checkout: {
      type: Object,
      default: function () {
        return {
          date: null,
          month: null
        }
      }
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
  }
}
</script>
<style scoped>
thead th {
  color: rgb(49, 49, 226);
  text-transform: capitalize;
  font-size: 1.3rem;
}
tbody .notMonth {
  color: #dadada;
  cursor: not-allowed;
}
tbody .date-now {
  color: #f00;
}
tbody .date-mark {
  background-color: #c2c2c2;
}
thead th, tbody td {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
tbody td{
  position: relative;
  font-size: 1.5rem;
  border-radius: 3px;
}
tbody td .hour {
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: .85rem;
}
 tbody td > .progress {
  position: absolute;
  display: block;
  bottom: -4px;
  left: 0;
  width: 95%;
}
tbody td .progress .fragment-progress {
  background: red;
  margin: 0;
  height: 2px;
  display: inline-block;
  box-sizing: border-box;
}
tbody td:hover {
  background-color: rgba(0,0,0,.2)
}
</style>