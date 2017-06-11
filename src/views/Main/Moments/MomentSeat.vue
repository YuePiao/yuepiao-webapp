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
import { Rounds , Movies , Cinemas} from '@/apis/moment'

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
  watch: {
    roundId () {
      this.fetchData()
    }
  },
  methods: {
    fetchData () {
      let self = this
      Rounds.meta({ rid: this.roundId })
        .then(({ body: round }) => {
          return Promise.all([
            Movies.get({ mid: round.movieId }).then(({ body: movie }) => movie),
            Cinemas.get({ mid: round.movieId, cid: round.cinemaId }).then(({ body: cinema }) => cinema),
            Rounds.get({ rid: this.roundId }).then(({ body: seats }) => seats),
          ])
          .then(([ movie, cinema, seats ]) => {
            round.movie = movie
            round.cinema = cinema
            round.seats = seats
            return round
          })
        })
        .then(round => {
          const rawSeats = round.seats
          const seats = Array(round.rows).fill(1).map(() => {
            return Array(round.columns).fill('available')
          })
          let friendSeats = [self.seat]
          rawSeats.forEach(rawSeat => {
            let type = 'available'
            if (friendSeats.some(friendSeat => friendSeat.x === rawSeat.id.seatX && friendSeat.y === rawSeat.id.seatY)) {
              type = 'friend'
            } else {
              type = rawSeat.reportedCount ? 'blocked' : 'disabled'
            }
            seats[rawSeat.id.seatY - 1][rawSeat.id.seatX - 1] = type
          })
          round.seats = seats;
          return round;
        })
        .then(round => {
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
