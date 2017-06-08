<template lang='pug'>
  .seat-selector
    .screen-placeholder 屏幕
    .seats
      .seat-row(v-for='(row, y) in seats', key='y')
        .seat(v-for='(seat, x) in row', key='x', :class='seatClass(x, y, seat)', @click='handleSeatClick(x, y)')
    .seat-examples
      .seat-example
        .seat.seat-available
        .example-label 可选
      .seat-example
        .seat.seat-disabled
        .example-label 不可选
      .seat-example
        .seat.seat-selected
        .example-label 已选
      .seat-example
        .seat.seat-blocked
        .example-label 黑名单
      .seat-example
        .seat.seat-friend
        .example-label 好友
</template>

<script>
export default {
  props: {
    seats: Array,
    selecteds: Array,
  },
  computed: {
    selectLimit () {
      return 1
    },
  },
  methods: {
    seatClass (x, y, seat) {
      if (this.selecteds.some(selected => {
        return selected.x === x && selected.y === y
      })) {
        return 'seat-selected'
      } else {
        return `seat-${seat}`
      }
    },
    handleSeatClick (x, y) {
      if (this.seats[y][x] === 'available') {
        const findIndex = this.selecteds.findIndex(selected => {
          return selected.x === x && selected.y === y
        })
        const newSelecteds = this.selecteds.slice()
        if (findIndex !== -1) {
          newSelecteds.splice(findIndex, 1)
        } else if (newSelecteds.length < this.selectLimit) {
          newSelecteds.push({ x, y })
        }
        this.$emit('update:selecteds', newSelecteds)
      }
    },
  },
}
</script>

<style scoped>
.seat-selector {
  /*background: #D8D8D8;*/
  border: solid 1px #99A9BF;
}

.screen-placeholder {
  color: white;
  text-align: center;
  background: #99A9BF;
  width: 100%;
}

.seat-examples {
  margin: 1rem 0;
}

.seats, .seat-examples {
  text-align: center;
}

.seat-example + .seat-example {
  margin-left: 0.5rem;
}

.seat-example, .seat-example > * {
  display: inline-block;
  vertical-align: top;
}

.example-label {
  height: 1rem;
  font-size: small;
}

.seat-examples, .seat-example, .seat-row {
  white-space: nowrap;
  overflow: hidden;
  line-height: 1rem;
}

.seats {
  margin: 1rem 0;
}

.seat-row + .seat-row {
  margin-top: 0.5rem;
}

.seat {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  vertical-align: top;
}

.seat + .seat {
  margin-left: 0.5rem;
}

.seat-available {
  cursor: pointer;
  background: #20a0ff;
}

.seat-available:hover {
  background: #c79a0a;
}

.seat-empty {
  background: transparent;
}

.seat-selected {
  cursor: pointer;
  background: #f7ba2a;
}

.seat-blocked {
  background: #ff4949;
}

.seat-disabled {
  background: #777777;
}

.seat-friend {
  background: green;
}
</style>
