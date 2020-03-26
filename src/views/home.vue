<template>
 <main role="main">
   <table>
     <caption>
       <div>
         <label for="backMonth" @click="backMonth">
           <svg width="25" height="25" viewBox="0 0 25 25">
             <path d="M19,0 L6.5,12.5 L19,25" fill="transparent" stroke="#000" stroke-width="1"/>
           </svg>
         </label>
         <label>Abril 2020 </label>
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
           <td v-for="(day, index2) in week" :key="index2">{{day}}</td>
         </tr>
         
       </tbody>
   </table>
 </main>
</template>
<script>
export default {
  name: 'view-home',
  data () {
    const d = new Date()
    return {
      currentDate: {
        day: d.getDay(),
        date: d.getDate(),
        year: d.getFullYear(),
        month: d.getMonth()
      },
      dayWeek: [
          'dom','seg', 'ter','qua','qui','sex','sáb'
        ],
        months: ['jan','fev','mar','abril']
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
          month[i].push(d.getDate())
          count = 1
        }
      }
     
      return month
    }
  },
  methods: {
    nextMonth () {
      this.currentDate.month++
    },
     backMonth () {
      this.currentDate.month--
    }
  }
}
</script>
<style scoped>
table caption  div{
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
table th, table td {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
table thead th {
  color: rgb(49, 49, 226);
}
table tbody td{
  font-size: 1.5rem;
  border-radius: 3px;
}
table tbody td:hover, table caption div label:active {
  background-color: rgba(0,0,0,.4)
}
</style>