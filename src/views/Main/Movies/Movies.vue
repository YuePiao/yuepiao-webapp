<template lang='pug'>
  .movies-page
    movie-list.movies-menu
      router-link(v-for='(movie, index) in movies', key='index', :to='{ name: "Cinemas", params: { movieId: movie.id } }')
        movie-list-item(:movie='movie')
    router-view.secondary-content
</template>

<script>
import MovieList from '@/components/MovieList'
import MovieListItem from '@/components/MovieListItem'

import { Movies } from '@/apis/main'

export default {
  components: {
    MovieList,
    MovieListItem,
  },
  data () {
    return {
      movies: [],
    }
  },
  computed: {
    routerName () {
      return this.$route.name
    },
  },
  watch: {
    routerName (newVal) {
      if (newVal === 'Movies') {
        this.fetchData()
          .then(() => this.gotoFirstMovie())
      }
    },
  },
  created () {
    this.fetchData()
      .then(() => {
        if (this.routerName === 'Movies') {
          this.gotoFirstMovie()
        }
      })
  },
  methods: {
    fetchData () {
      return Movies.get()
        .then(({ body: movies }) => {
          this.movies = movies
        })
    },
    gotoFirstMovie () {
      if (this.movies.length) {
        this.$router.push({
          name: 'Cinemas',
          params: {
            movieId: this.movies[0].id,
          },
        })
      }
    },
  },
}
</script>

<style>
.movies-page {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100%;
}

.movies-menu {
  flex: none;
  width: 16rem;
}
</style>
