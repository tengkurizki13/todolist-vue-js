<script>
import { mapActions,mapState } from 'pinia'
import { useActivityStore } from '../stores/activity'

export default {
  props:['todo'],
  data() {
    return {
      isChecked: this.todo.is_active === 1, 
    };
  },
  methods: {
    ...mapActions(useActivityStore, ['deleteTodo','updateTodoActive']),
    deleteTodoHandler(){
      this.deleteTodo(this.todo.id,this.todo.activity_group_id)
    },
    openEditHandler(){
      this.$parent.openEditModal(this.todo.id,this.todo.title,this.todo.priority);
    },
    handleCheckboxChange(event) {
      const isChecked = event.target.checked; 
      this.updateTodoActive(this.todo.id,this.todo.activity_group_id,isChecked)
    }
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
 <div data-cy="todo-item" class="jss27">
        <div class="jss28">
            <input type="checkbox" data-cy="todo-item-checkbox" @change="handleCheckboxChange" v-model="isChecked"><span class="jss32"></span>
          <div data-cy="todo-item-priority-indicator" class="jss29" style="background: rgb(237, 76, 92);" v-if="todo.priority === 'very-high'"></div>
          <div data-cy="todo-item-priority-indicator" class="jss29" style="background: rgb(255, 107, 38);" v-if="todo.priority === 'high'"></div>
          <div data-cy="todo-item-priority-indicator" class="jss29" style="background: rgb(33, 109, 20);" v-if="todo.priority === 'normal'"></div>
          <div data-cy="todo-item-priority-indicator" class="jss29" style="background: rgb(40, 109, 161);" v-if="todo.priority === 'low'"></div>
          <div data-cy="todo-item-priority-indicator" class="jss29" style="background: rgb(161, 44, 147);" v-if="todo.priority === 'very-low'"></div>
            <div data-cy="todo-item-title" class="jss30">{{ todo.title }}</div>
            <svg @click="openEditHandler" data-bs-toggle="modal" data-bs-target="#exampleModal" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-cy="todo-item-edit-button"><path d="M4 19.9998H8L18.5 9.49981C19.0304 8.96938 19.3284 8.24996 19.3284 7.49981C19.3284 6.74967 19.0304 6.03025 18.5 5.49981C17.9696 4.96938 17.2501 4.67139 16.5 4.67139C15.7499 4.67139 15.0304 4.96938 14.5 5.49981L4 15.9998V19.9998Z" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13.5 6.49982L17.5 10.4998" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
           </div>

          <svg @click="deleteTodoHandler" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-cy="todo-item-delete-button"><path d="M4 7H20" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 11V17" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 11V17" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>

</template>