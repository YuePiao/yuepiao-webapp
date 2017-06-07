<template lang='pug'>
  .cinemas-page
    cinema-list.cinema-list
      router-link(v-for='(cinema, index) in cinemas', key='index', :to='{ name: "Rounds", params: { movieId: movieId, cinemaId: cinema.id } }')
        cinema-list-item(:cinema='cinema')
    .round-table
      el-table(:data='rounds')
        el-table-column(label='时间')
          template(scope='round')
            el-icon(name='time')
            span {{ solveTime(round.row.beginTime, round.row.endTime) }}
        el-table-column(prop='place', label='影厅')
        el-table-column(prop='price', label='票价')
        el-table-column(label='操作')
          template(scope='round')
            router-link(:to='{ name: "Seats", params: { roundId: round.row.id } }')
              el-button 购票
</template>

<script>
import CinemaList from '@/components/CinemaList'
import CinemaListItem from '@/components/CinemaListItem'

import { Cinemas, Rounds } from '@/apis/main'

export default {
  components: {
    CinemaList,
    CinemaListItem,
  },
  data () {
    return {
      cinemas: [],
      rounds: [],
    }
  },
  computed: {
    movieId () {
      return this.$route.params.movieId
    },
    cinemaId () {
      return this.$route.params.cinemaId
    },
  },
  watch: {
    movieId () {
      this.fetchData()
    },
    cinemaId () {
      this.fetchRounds()
    },
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.fetchCinemas()
      this.fetchRounds()
    },
    fetchCinemas () {
      return Cinemas.get({ mid: this.movieId })
        .then(({ body: cinemas }) => {
          this.cinemas = cinemas
        })
    },
    fetchRounds () {
      let promise
      if (typeof this.cinemaId !== 'undefined') {
        promise = Rounds.get({ mid: this.movieId, cid: this.cinemas })
      } else {
        promise = Promise.resolve({ body: [] })
      }
      return promise.then(({ body: rounds }) => {
        this.rounds = rounds
      })
    },
    solveTime (begin, end) {
      return new Date(begin) + new Date(end)
    },
  },
}
</script>

<style scoped>
.cinema-list, .round-table {
  height: 50%;
  padding: 0 1rem;
}

.cinema-list a {
  text-decoration: none;
}
</style>
