<template lang='pug'>
.seats-page
  seat-selector(:seats='seats', :selecteds.sync='selecteds')
  p {{selecteds}}
</template>

<script>
import SeatSelector from '@/components/SeatSelector'

import { Rounds } from '@/apis/main'

export default {
  components: {
    SeatSelector,
  },
  data () {
    return {
      seatsRows: 0,
      seatsColumns: 0,
      seats: [],
      selecteds: [],
    }
  },
  computed: {
    roundId () {
      return this.$route.params.roundId
    },
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      Rounds.get({ rid: this.roundId })
        .then(({ body: { seatsRows, seatsColumns, seats }}) => {
          this.seatsRows = seatsRows
          this.seatsColumns = seatsColumns
          this.seats = seats
        })
    },
  },
}
</script>

<style>

</style>
