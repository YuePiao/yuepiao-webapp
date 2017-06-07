<template lang='pug'>
  .movies-page
    movie-list.movies-menu
      movie-list-item(v-for='(movie, index) in movies', key='index', :movie='movie')
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
  created () {
    Movies.get()
      .then(({ body: movies }) => {
        this.movies = movies
      })
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
