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
