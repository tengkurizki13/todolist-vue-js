<script>
import { mapActions,mapState } from 'pinia'
import { useActivityStore } from '../stores/activity'

export default {
  props:['activity'],
  methods: {
    ...mapActions(useActivityStore, ['deleteActivity',"changePage",'getActivityDetail','getTodos']),
    deleteActivityHandler(){
      this.deleteActivity(this.activity.id)
    },
    getActivityDetailHandler(){
      this.getActivityDetail (this.activity.id)
      this.getTodos (this.activity.id)
    },
  },
  computed: {
    confirmDate() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(this.activity.created_at);

      return date.toLocaleDateString('id-ID', options);
    },
    }
}
</script>
<template>
  <div data-cy="activity-item" class="jss262 jss261">
    <div data-cy="activity-item-title" class="jss263"  @click="getActivityDetailHandler">{{ activity.title }}</div>
    <div class="jss265"><div data-cy="activity-item-date" class="jss264">{{ confirmDate }}</div>
    <svg @click="deleteActivityHandler" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-cy="activity-item-delete-button"><path d="M4 7H20" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 11V17" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 11V17" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
  </div>
</div>
</template>