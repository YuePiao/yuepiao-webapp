<template lang='pug'>
.seats-page
  round-info(:movie='currentMovie' , :cinema='currentCinema' , :total='amount' , :time='startTime' , :price='price' , :position='position')
  seat-selector(:seats='seats', :selecteds.sync='selecteds')
  p {{selecteds}}
</template>

<script>
import SeatSelector from '@/components/SeatSelector'
import RoundInfo from '@/components/RoundInfo'
import { Rounds } from '@/apis/main'

export default {
  components: {
    RoundInfo,
    SeatSelector,
  },
  data () {
    return {
      seatsRows: 0,
      seatsColumns: 0,
      seats: [],
      currentMovie: new Object(),
      currentCinema: new Object(),
      startTime: 0,
      price: 0,
      position: '',
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
        .then(({ body }) => {
          this.seatsRows = body.seatsRows
          this.seatsColumns = body.seatsColumns
          this.seats = body.seats
          this.price = body.price
          this.startTime = body.beginTime
          this.position = body.place
          this.currentMovie = body.movie
          this.currentCinema = body.cinema
        })
    },
  },
}
</script>

<style>

</style>
