<template lang='pug'>
.seats-page
  .round-info
    round-info(:round='round')
  .seat-selector
    seat-selector(:seats='round.seats', :selecteds.sync='selecteds')
</template>

<script>
import RoundInfo from '@/components/RoundInfo'
import SeatSelector from '@/components/SeatSelector'
import { Rounds } from '@/apis/moment'

export default {
  components: {
    RoundInfo,
    SeatSelector,
  },
  data () {
    return {
      round: {},
      selecteds: [],
    }
  },
  computed: {
    roundId () {
      return this.$route.params.roundId
    },
    seat () {
      return {
        x: this.$route.params.seatX,
        y: this.$route.params.seatY,
      };
    },
    amount () {
      return this.price * this.selecteds.length
    },
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      Rounds.get()
      // Rounds.get({ rid: this.roundId })
        .then(({ body: round}) => {
          // Fetch from Server with the current User friend
          this.round = round
          if (this.seat.x < 0 || this.seat.y < 0 || this.seat.x >= round.seatsRows || this.seat.y >= round.seatsColumns) return;
          // Mark the current Round example into the seats attribute
          this.round.seats[this.seat.x][this.seat.y] = 'friend';
        })
    },
  },
}
</script>

<style>
.round-info {
  padding: 1rem 0;
}
</style>
