<!-- <script>
import { mapActions,mapWritableState } from 'pinia'
import { useActivityStore } from '../stores/activity'

export default {
  props:['activity'],
  methods: {
    ...mapActions(useActivityStore, ["changePage",'getActivityDetail','getTodos','deleteActivity']),
    
  },
  computed: {
    ...mapWritableState(useActivityStore, ['isDeleteActivity','isConfirmDelete']),
    confirmDate() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(this.activity.created_at);

      return date.toLocaleDateString('id-ID', options);
    },
    }
}
</script>
<template>



</template>


<style>

</style> -->