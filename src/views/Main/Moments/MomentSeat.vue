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
import { Rounds } from '@/apis/main'

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
    amount () {
      return this.price * this.selecteds.length
    },
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      Rounds.get({ rid: this.roundId })
        .then(({ body: round}) => {
          // Fetch from Server with the current User friend
          this.round = round
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
