<template>
  <tbody>
    <tr v-for="(line, index) in yaers" :key="index">
      <td v-for="(year, index2) in line"
      :key="index2"
      :class="{active: currentYear === year}"
      @click="$emit('setYear', year)">{{year}}</td>
    </tr>
  </tbody>
</template>
<script>
export default {
  name: 'calendar-year',
  props: {
    currentYear: Number,
    matrix: {
      type: Number,
      default: 5
    }
  },
  computed: {
    yaers () {
      let dates = []
      const startYear = this.currentYear - parseInt(((this.matrix) * this.matrix) / 2)
      let count = startYear
      for(let i = 0; i < this.matrix; i++) {
        dates[i] = []
        for(let j = 0; j < this.matrix; j++) {
          if(count !== this.currentYear) {
            dates[i][j] = count
          } else {
            dates[i][j] = this.currentYear
          }
          count++
        }
      }
      return dates
    }
  }
}
</script>

<style scoped>
tbody td {
  width: 76px;
  height: 50px;
  font-size: 1.5rem;
  text-align: center;
  line-height: 50px;
  vertical-align: middle;
}
tbody td:hover  {
  background-color: rgba(0,0,0,0.2);
  cursor: pointer;
}
.active {
  color: #f00;
  border: 1px solid;
}
</style>