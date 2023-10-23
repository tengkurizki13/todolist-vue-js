<script>
import { mapActions,mapWritableState } from 'pinia'
import { useActivityStore } from '../stores/activity'

export default {
  props:['activity'],
  methods: {
    ...mapActions(useActivityStore, ["changePage",'getActivityDetail','getTodos','deleteActivity']),
    showDeleteActivityHandler(){
      this.isDeleteActivity = !this.isDeleteActivity
    },
    cancelDeleteActivityHandler(){
      this.isDeleteActivity = !this.isDeleteActivity
    },
    deleteActivityHandler(){
      console.log(this.activity.id);
      this.deleteActivity(this.activity.id)
    },
    getActivityDetailHandler(){
      this.getActivityDetail (this.activity.id)
      this.getTodos (this.activity.id)
    },
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
  <div data-cy="activity-item" class="jss262 jss261">
    <div data-cy="activity-item-title" class="jss263"  @click="getActivityDetailHandler">{{ activity.title }}</div>
    <div class="jss265"><div data-cy="activity-item-date" class="jss264">{{ confirmDate }}</div>
    <svg @click="showDeleteActivityHandler" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-cy="activity-item-delete-button"><path d="M4 7H20" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 11V17" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 11V17" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
  </div>
</div>

<!-- modal delete -->

<div data-cy="modal-delete" class="jss24 jss5" v-if="!isDeleteActivity">
  <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg" data-cy="modal-delete-icon" class="jss27"><path d="M42 52.5V52.535M42 31.5V38.5V31.5Z" stroke="#ED4C5C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.5002 66.5012H66.5002C67.6423 66.4932 68.765 66.2059 69.7705 65.6643C70.7761 65.1227 71.6338 64.3433 72.2689 63.3941C72.904 62.4449 73.2972 61.3546 73.4142 60.2186C73.5312 59.0825 73.3685 57.935 72.9402 56.8762L48.0902 14.0012C47.4848 12.9071 46.5975 11.9952 45.5203 11.3601C44.4432 10.725 43.2156 10.3901 41.9652 10.3901C40.7148 10.3901 39.4872 10.725 38.41 11.3601C37.3329 11.9952 36.4455 12.9071 35.8402 14.0012L10.9902 56.8762C10.57 57.9108 10.4033 59.0308 10.5042 60.1428C10.6051 61.2549 10.9705 62.3266 11.57 63.2687C12.1694 64.2107 12.9856 64.9956 13.9502 65.558C14.9149 66.1203 16.0001 66.4438 17.1152 66.5012" stroke="#ED4C5C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg>
  <div data-cy="modal-delete-title" class="jss28">Apakah anda yakin menghapus activity</div>
  <div class="jss28 jss29">"New Activity"?</div><div class="jss25">
    <button class="jss11 jss26" data-cy="modal-delete-cancel-button" @click="cancelDeleteActivityHandler">Batal</button><button class="jss11 jss13 jss26" data-cy="modal-delete-confirm-button" @click="deleteActivityHandler">Hapus</button>
  </div>
</div>

<!-- confirm delete -->

<div class="jss63" style="max-width: 490px;" v-if="isConfirmDelete">
<div data-cy="modal-information" class="jss76"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-cy="modal-information-icon"><path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#00A790" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 8V12" stroke="#00A790" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 16H12.01" stroke="#00A790" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg><div data-cy="modal-information-title" class="jss77">Activity berhasil dihapus</div></div></div>
</template>


<style>

</style>