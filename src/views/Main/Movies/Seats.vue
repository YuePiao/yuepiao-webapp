<template lang='pug'>
.seats-page
  .round-info
    round-info(:round='round', :disabled='!Boolean(selecteds.length)', @confirm='handleConfirm')
  .alerts
    el-alert(v-if='selecteds.length', :title='`已选择 ${ selecteds[0].y + 1 } 排 ${ selecteds[0].x + 1 } 座`', type='success', :closable='false')
    el-alert(v-else, title='请选择座位', type='warning', :closable='false')
  .selector
    seat-selector(:seats='round.seats', :selecteds.sync='selecteds')
</template>

<script>
import RoundInfo from '@/components/RoundInfo'
import SeatSelector from '@/components/SeatSelector'
import { mapGetters } from 'vuex'
import { User, Movies, Cinemas, Rounds } from '@/apis/main'

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
    ...mapGetters([
      'currentUser',
    ]),
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
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
            console.log('map')
            return Array(round.columns).fill('available')
          })
          console.log(seats)
          return User.following({ id: this.currentUser.userId })
            .then(({ body: followings }) => {
              rawSeats.forEach(rawSeat => {
                let type = 'available'
                if (followings.some(following => following === rawSeat.id.userId)) {
                  type = 'friend'
                } else {
                  type = rawSeat.reportedCount ? 'blocked' : 'disabled'
                }
                seats[rawSeat.id.seatY - 1][rawSeat.id.seatX - 1] = type
              })
            })
            .then(() => {
              round.seats = seats
              return round
            })
        })
        .then(round => {
          this.round = round
        })
    },
    handleConfirm () {
      // TODO confirm
      console.log('confirm')
    },
  },
}
</script>

<style scoped>
.round-info {
  padding: 1rem 0;
}

.alerts {
  padding: 0 1rem;
}

.selector {
  padding: 1rem;
}
</style>
