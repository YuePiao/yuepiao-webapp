<template lang='pug'>
  li.movie-list-item
    img.movie-cover(:src='movie.uri')
    .movie-description
      .movie-name {{ movie.name }}
      .movie-type 类型: {{ movie.type }}
      .movie-duration 时长: {{ movie.duration }}
</template>

<script>
export default {
  props: {
    movie: Object,
  },
}
</script>

<style>
.movie-list-item {
  height: 6rem;
  width: 14rem;
  margin: 0;
  padding: 1rem;
  white-space: nowrap;
  overflow: hidden;
}

.movie-list-item .movie-cover, .movie-list-item .movie-description {
  display: inline-block;
  vertical-align: top;
}

.movie-list-item .movie-cover {
  height: 6rem;
  width: 4.5rem;
  background-color: #A1A0A0;
}

.movie-list-item .movie-description {
  padding-left: 0.5rem;
}

.movie-list-item .movie-name {
  display: block;
  font-size: x-large;
}
</style>
