<script>
// import ActivityCard from '../components/ActivityCard.vue'
import TodoCard from '../components/TodoCard.vue'
import Navbar from '../components/Navbar.vue'
import { mapActions,mapState,mapWritableState } from 'pinia'
import { useActivityStore } from '../stores/activity'
import _ from 'lodash';


export default {
  components: {
    // ActivityCard,
    TodoCard,
    Navbar
  },
  data() {
    return {
      isSort: false,
      isSort: false,
      isUpdateTitle:false,
      isEditing: false,
      isDeletingTodo: false,
      idTodo: 0,
      allTodo :[],
      empty:true,
      idActivity :0,
     
    }
  },
  methods: {
    ...mapActions(useActivityStore, ['getActivities','addActivity','changePage','addTodo','updateTitle','updateTodo','getActivityDetail','getTodos','deleteActivity','deleteTodo','updateTodoActive']),
    addActivityHandler(){
      this.addActivity()
    },
  
    changePageHandler(){
      this.changePage ()
    },
    showDeleteActivityHandler(id){
      this.idActivity = id
      this.isDeleteData = !this.isDeleteData
      this.isDeletingTodo = false
    },
    showDeleteTodoHandler(id,activity_group_id){
      this.idTodo = id
      this.idActivity = activity_group_id
      this.isDeleteData = !this.isDeleteData
      this.isDeletingTodo = true
    },
    cancelDeleteHandler(){
      console.log("masuk");
      this.isDeleteData = !this.isDeleteData
    },
    deleteHandler(id){
      if (this.isDeletingTodo) {
        this.deleteTodo(this.idTodo,this.idActivity)
      }else{
        this.deleteActivity(this.idActivity)
      }
    },
    getActivityDetailHandler(id){
      this.getActivityDetail (id)
      this.getTodos (id)
    },
    submitHandler(){
      if (this.isEditing) {
        this.updateTodo (this.idTodo,this.activity.id,)
      }else{
        this.addTodo (this.activity.id)
      }
    },
    handleInputChange() {
      this.updateTitle(this.activity.id, this.activity.title);
    },
    changeElement(action){
      if (action == 'input'){
        this.isUpdateTitle =true
      }else if (action == 'svg'){
        this.isUpdateTitle = !this.isUpdateTitle
      }else{
        this.isUpdateTitle =false
      }
    },
    showElementSort(){
      this.isSort = !this.isSort
    },
    openEditHandler(id,title,priority){
      this.openEditModal(id,title,priority);
    },
    handleCheckboxChange(idTodo,activity_group_id) {
      const isChecked = event.target.checked; 
      this.updateTodoActive(idTodo,activity_group_id,isChecked)
    },
    handleSort(keySort) {
      if (this.allTodo.length === 0) {
        this.allTodo = [...this.todos]; 
      }

      switch (keySort) {
        case "terbaru":
          this.todos = [...this.allTodo]; 
          this.isSort = !this.isSort
          break;
        case "terlama":
          this.todos = [...this.allTodo]; // Menduplikat isi this.allTodo ke this.todos
          this.todos = this.todos.reverse();
           this.isSort = !this.isSort
          break;
        case "A-Z":
          this.todos = [...this.allTodo]; // Menduplikat isi this.allTodo ke this.todos
          this.todos = _.orderBy(this.todos, ['title'], ['asc']);
           this.isSort = !this.isSort
          break;
        case "Z-A":
          this.todos = [...this.allTodo]; // Menduplikat isi this.allTodo ke this.todos
          this.todos = _.orderBy(this.todos, ['title'], ['desc']);
           this.isSort = !this.isSort
          break;
        case "belum-selesai":
          this.todos = [...this.allTodo]; // Menduplikat isi this.allTodo ke this.todos
          this.isSort = !this.isSort
          break;
        default:
          break;
      }
    },
    openEditModal(id,titleEdit,priorityEdit) {
    this.isEditing = true;
    this.title = titleEdit;
    this.priority = priorityEdit;
    this.idTodo = id;
    },
    openAddModal() {
      this.isEditing = false;
      this.empty = true
      this.title = "";
      this.priority = "very-high";
    },
    checkInput() {
      if (this.title === "") {
        this.empty =true
      }else{
        this.empty = false
      }
    },
  },
  computed: {
    ...mapState(useActivityStore, ['activities','showComponent','activity']),
    ...mapWritableState(useActivityStore, ['title','priority','todos','isDeleteData','isConfirmDelete','isDeleteTodo']),
    confirmDate() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(this.activity.created_at);

      return date.toLocaleDateString('id-ID', options);
    },
  },
  created(){
    this.getActivities()
  }
}
</script>

<template>
  <Navbar @click="changeElement"/>
  <div class="container">
    <section :class="{ 'hidden': !showComponent }">
    <div class="jss255">
      <div class="jss256">
        <h1 class="jss10" data-cy="activity-title">Activity</h1>
        <button class="jss11 jss12" data-cy="activity-add-button" @click="addActivityHandler"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.99988V18.9999" stroke="white" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"></path><path d="M5 12H19" stroke="white" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"></path></svg>
          Tambah
        </button>
      </div>
      <div class="jss260">
        <div data-cy="activity-item" class="jss262 jss261" v-for="activity in activities" :key="activity.id" :activity="activity">
            <div data-cy="activity-item-title" class="jss263"  @click="getActivityDetailHandler(activity.id)">{{ activity.title }}</div>
            <div class="jss265"><div data-cy="activity-item-date" class="jss264">{{ confirmDate }}</div>
            <svg @click="showDeleteActivityHandler(activity.id)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-cy="activity-item-delete-button"><path d="M4 7H20" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 11V17" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 11V17" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
        </div>
      </div>
      <img v-if="activities.length === 0" data-cy="activity-empty-state" src="https://todo-devcode.web.app/static/media/activity-empty-state.5f1bc10d.png
" alt="add-activity" class="jss216" @click="addActivityHandler">
    </div>
    </section>

    <!-- =============================== hal2====================== -->
    <section :class="{ 'hidden': showComponent }" @click="changeElementOutInput">
      <div class="jss18">
        <div class="jss25 jss26 jss20">
          <div class="jss25">
            <svg width="32" @click="changePageHandler" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" data-cy="todo-back-button" class="jss23"><path d="M6.66675 16L14.6667 24" stroke="#111111" stroke-width="5" stroke-linecap="square"></path><path d="M6.66675 16L14.6667 8" stroke="#111111" stroke-width="5" stroke-linecap="square"></path></svg>
            <h1 class="jss10" data-cy="todo-title" v-if="!isUpdateTitle" @click="changeElement('input')">{{ activity.title }}</h1>
            <input type="text" class="form-control border-0  bg-transparent input-h1-size" v-model="activity.title" @change="handleInputChange" v-if="isUpdateTitle" />
            <svg @click="changeElement('svg')" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-cy="todo-title-edit-button" class="jss23"><path d="M4 19.9998H8L18.5 9.49981C19.0304 8.96938 19.3284 8.24996 19.3284 7.49981C19.3284 6.74967 19.0304 6.03025 18.5 5.49981C17.9696 4.96938 17.2501 4.67139 16.5 4.67139C15.7499 4.67139 15.0304 4.96938 14.5 5.49981L4 15.9998V19.9998Z" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13.5 6.49982L17.5 10.4998" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>

          <!-- sort -->
          <div role="tooltip" id="simple-popper" style="position: absolute; top: 250px; left: 0px; transform: translate3d(1133px, 5px, 0px); will-change: transform;" x-placement="top" v-if="isSort">
            <div data-cy="sort-parent" class="jss125">
              <div data-cy="sort-selection" class="jss126" @click="handleSort('terbaru')">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 4.5H9.75" stroke="#16ABF8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 9H8.25" stroke="#16ABF8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 13.5H8.25" stroke="#16ABF8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.25 11.25L13.5 13.5L15.75 11.25" stroke="#16ABF8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13.5 4.5V13.5" stroke="#16ABF8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                <div class="jss127">
                  Terbaru</div>
                </div>
                <div data-cy="sort-selection" class="jss126" @click="handleSort('terlama')">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 4.5H8.25" stroke="#16ABF8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 9H8.25" stroke="#16ABF8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 13.5H9.75" stroke="#16ABF8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.25 6.75L13.5 4.5L15.75 6.75" stroke="#16ABF8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13.5 4.5V13.5" stroke="#16ABF8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                  <div class="jss127">
                    Terlama</div>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.75 9L7.5 12.75L15 5.25" stroke="#4A4A4A" stroke-linecap="square"></path></svg>
                </div>
                <div data-cy="sort-selection" class="jss126" @click="handleSort('A-Z')">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.25 7.5V3.75C11.25 2.715 11.715 2.25 12.75 2.25C13.785 2.25 14.25 2.715 14.25 3.75V7.5M14.25 5.25H11.25" stroke="#16ABF8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.25 15.75H11.25L14.25 10.5H11.25" stroke="#16ABF8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 11.25L5.25 13.5L7.5 11.25" stroke="#16ABF8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.25 4.5V13.5" stroke="#16ABF8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                  <div class="jss127">
                    A-Z</div>
                  </div>
                  <div data-cy="sort-selection" class="jss126" @click="handleSort('Z-A')">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.25 15.75V12C11.25 10.965 11.715 10.5 12.75 10.5C13.785 10.5 14.25 10.965 14.25 12V15.75M14.25 13.5H11.25" stroke="#16ABF8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.25 7.5H11.25L14.25 2.25H11.25" stroke="#16ABF8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 11.25L5.25 13.5L7.5 11.25" stroke="#16ABF8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.25 4.5V13.5" stroke="#16ABF8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    <div class="jss127">
                      Z-A</div>
                    </div>
                    <div data-cy="sort-selection" class="jss126" @click="handleSort('belum-selesai')">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.25 6.75L5.25 3.75M5.25 3.75L8.25 6.75M5.25 3.75V14.25" stroke="#16ABF8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.75 11.25L12.75 14.25M12.75 14.25L9.75 11.25M12.75 14.25V3.75" stroke="#16ABF8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                      <div class="jss127">
                        Belum Selesai</div>
                      </div>
                    </div>
                  </div>
            
            <div class="jss25" >
              <svg @click="showElementSort" width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" data-cy="todo-sort-button" class="jss23" type="button"><path d="M18 24L22 20M22 20L26 24M22 20V34" stroke="#888888" stroke-width="1.5" stroke-linecap="square"></path><path d="M36 30L32 34M32 34L28 30M32 34V20" stroke="#888888" stroke-width="1.5" stroke-linecap="square"></path><rect x="0.5" y="0.5" width="53" height="53" rx="26.5" stroke="#E5E5E5"></rect></svg>

              <button @click="openAddModal" class="jss11 jss12" data-cy="todo-add-button" data-bs-toggle="modal" data-bs-target="#exampleModal"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.99988V18.9999" stroke="white" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"></path><path d="M5 12H19" stroke="white" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"></path></svg>
                Tambah
              </button>
            </div>
          </div>
      
          <!-- item -->
          <!-- <TodoCard v-for="todo in todos" :key="todo.id" :todo="todo" /> -->
          <div data-cy="todo-item" class="jss27" v-for="todo in todos" :key="todo.id">
        <div class="jss28">
            <input type="checkbox" data-cy="todo-item-checkbox" @change="handleCheckboxChange(todo.id,todo.activity_group_id)" v-model="todo.is_active" :true-value="1" :false-value="0"><span class="jss32"></span>
          <div data-cy="todo-item-priority-indicator" class="jss29" style="background: rgb(237, 76, 92);" v-if="todo.priority === 'very-high'"></div>
          <div data-cy="todo-item-priority-indicator" class="jss29" style="background: rgb(255, 107, 38);" v-if="todo.priority === 'high'"></div>
          <div data-cy="todo-item-priority-indicator" class="jss29" style="background: rgb(33, 109, 20);" v-if="todo.priority === 'normal'"></div>
          <div data-cy="todo-item-priority-indicator" class="jss29" style="background: rgb(40, 109, 161);" v-if="todo.priority === 'low'"></div>
          <div data-cy="todo-item-priority-indicator" class="jss29" style="background: rgb(161, 44, 147);" v-if="todo.priority === 'very-low'"></div>
            <div data-cy="todo-item-title" class="jss30">{{ todo.title }}</div>
            <svg @click="openEditHandler(todo.id,todo.title,todo.priority)" data-bs-toggle="modal" data-bs-target="#exampleModal" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-cy="todo-item-edit-button"><path d="M4 19.9998H8L18.5 9.49981C19.0304 8.96938 19.3284 8.24996 19.3284 7.49981C19.3284 6.74967 19.0304 6.03025 18.5 5.49981C17.9696 4.96938 17.2501 4.67139 16.5 4.67139C15.7499 4.67139 15.0304 4.96938 14.5 5.49981L4 15.9998V19.9998Z" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13.5 6.49982L17.5 10.4998" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
           </div>

          <svg @click="showDeleteTodoHandler(todo.id,todo.activity_group_id)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-cy="todo-item-delete-button"><path d="M4 7H20" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 11V17" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 11V17" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
      <!-- img -->
      <img v-if="todos.length === 0"  data-cy="todo-empty-state" src="https://todo-devcode.web.app/static/media/todo-empty-state.a0b4b794.png" alt="add-todo" class="jss22" >
    </div>
    </section>
  </div>




 <!-- modal -->
 <div class="modal fade" data-cy="modal-add" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="submitHandler">
      <div class="modal-body">
        <div class="jss183"><div data-cy="modal-add-title" class="jss184">Tambah List Item</div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-cy="modal-add-close-button"></svg>
          </div>
          <div class="jss185">
            <div data-cy="modal-add-name-title" class="jss186">NAMA LIST ITEM</div>
            <input class="jss189 jss187" data-cy="modal-add-name-input" placeholder="Tambahkan nama list item" v-model="title" @input="checkInput">
            <div data-cy="modal-add-priority-title" class="jss186">PRIORITY</div>
            <select class="form-select" data-cy="modal-add-priority-dropdown" v-model="priority">
                <option value="very-high" data-cy="modal-add-priority-item-very-high">Very High</option>
                <option value="high" data-cy="modal-add-priority-item-high">High</option>
                <option value="normal" data-cy="modal-add-priority-item-normal">Medium</option>
                <option value="low" data-cy="modal-add-priority-item-low">Low</option>
                <option value="very-low" data-cy="modal-add-priority-item-very-low">Very Low</option>
              </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" data-cy="modal-add-save-button" :disabled="empty">Save</button>
        </div>
      </form>
    </div>
  </div>
</div>

<div aria-hidden="true" style="z-index: 0; position: fixed; inset: 0px; background-color: rgba(0, 0, 0, 0.5); -webkit-tap-highlight-color: transparent;" v-if="!isDeleteData" @click="cancelDeleteHandler"></div>
<!-- modal delete -->

<div data-cy="modal-delete" class="jss24 jss5" v-if="!isDeleteData">
  <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg" data-cy="modal-delete-icon" class="jss27"><path d="M42 52.5V52.535M42 31.5V38.5V31.5Z" stroke="#ED4C5C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.5002 66.5012H66.5002C67.6423 66.4932 68.765 66.2059 69.7705 65.6643C70.7761 65.1227 71.6338 64.3433 72.2689 63.3941C72.904 62.4449 73.2972 61.3546 73.4142 60.2186C73.5312 59.0825 73.3685 57.935 72.9402 56.8762L48.0902 14.0012C47.4848 12.9071 46.5975 11.9952 45.5203 11.3601C44.4432 10.725 43.2156 10.3901 41.9652 10.3901C40.7148 10.3901 39.4872 10.725 38.41 11.3601C37.3329 11.9952 36.4455 12.9071 35.8402 14.0012L10.9902 56.8762C10.57 57.9108 10.4033 59.0308 10.5042 60.1428C10.6051 61.2549 10.9705 62.3266 11.57 63.2687C12.1694 64.2107 12.9856 64.9956 13.9502 65.558C14.9149 66.1203 16.0001 66.4438 17.1152 66.5012" stroke="#ED4C5C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg>
  <div data-cy="modal-delete-title" class="jss28">Apakah anda yakin menghapus activity</div>
  <div class="jss28 jss29">"New Activity"?</div><div class="jss25">
    <button class="jss11 jss26" data-cy="modal-delete-cancel-button" @click="cancelDeleteHandler">Batal</button><button class="jss11 jss13 jss26" data-cy="modal-delete-confirm-button" @click="deleteHandler">Hapus</button>
  </div>
</div>

<!-- confirm delete -->

<div class="jss63" style="max-width: 490px;" v-if="isConfirmDelete">
<div data-cy="modal-information" class="jss76"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-cy="modal-information-icon"><path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#00A790" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 8V12" stroke="#00A790" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 16H12.01" stroke="#00A790" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg><div data-cy="modal-information-title" class="jss77">Activity berhasil dihapus</div></div></div>


</template>

<style>

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Warna latar belakang overlay, termasuk tingkat transparansi */
  z-index: 999; /* Z-index untuk memastikan overlay tampil di atas konten lain */
  display: none; /* Awalnya sembunyi */
  cursor: pointer; /* Ubah kursor mouse menjadi pointer saat mengarahkan ke overlay */
}
.hidden {
  display: none;
}



.input-h1-size {
  font-size: 2rem; 
  font-weight: bold;
}

.jss27 {
    margin-bottom: 50px;
}

.jss63 {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%,-50%);
}

.jss76 {
    display: flex;
    padding: 20px 30px;
    background: #FFFFFF;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    align-items: center;
    border-radius: 12px;
}


.jss28 {
    color: #111111;
    font-size: 18px;
    text-align: center;
    font-weight: 500;
    line-height: 150%;
}

.jss25 {
    display: flex;
    margin-top: 46px;
    justify-content: center;
}

.jss29 {
    font-weight: 700;
}
.jss5 {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%,-50%);
}
.jss24 {
    width: 490px;
    display: flex;
    padding: 50px 58px 43px;
    background: #FFFFFF;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    align-items: center;
    border-radius: 12px;
    flex-direction: column;
}
.jss26 {
    margin: 0 10px;
}
.jss13 {
    color: #FFFFFF;
    background: #ED4C5C;
}
.jss11 {
    border: none;
    height: 54px;
    margin: 0px 6px;
    font-size: 18px;
    min-width: 150px;
    font-weight: 600;
    border-radius: 45px;
    text-transform: capitalize;
}

.jss216 {
    height: auto;
    margin: auto;
    display: flex;
    max-width: 100%;
}
img {
    overflow-clip-margin: content-box;
    overflow: clip;
}

.jss22 {
    height: auto;
    margin: auto;
    display: flex;
    max-width: 100%;
}

img {
    overflow-clip-margin: content-box;
    overflow: clip;
}

.jss27 {
    display: flex;
    padding: 30px 28px;
    background: #FFFFFF;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
    align-items: center;
    border-radius: 12px;
    margin-bottom: 10px;
}

.jss28 {
    display: flex;
    flex-grow: 1;
    align-items: center;
}

.jss30 {
    color: #111111;
    font-size: 18px;
    font-weight: 500;
    margin-right: 19px;
}

.jss31 {
    display: block;
    position: relative;
    font-size: 22px;
    user-select: none;
    padding-left: 20px;
    margin-bottom: 20px;
}

.jss31 input {
    width: 1px;
    cursor: pointer;
    height: 1px;
    opacity: 0;
    position: absolute;
}
.jss32 {
    top: 0;
    left: 0;
    width: 20px;
    border: 1px solid #C7C7C7;
    height: 20px;
    position: absolute;
}

.jss29 {
    width: 9px;
    height: 9px;
    margin: 0 16px 0 13px;
    background: #16ABF8;
    border-radius: 50%;
}



.jss10 {
    color: #111111;
    font-size: 36px;
    font-weight: bold;
}
.jss26 {
    justify-content: space-between;
}
.jss25 {
    display: flex;
    align-items: center;
}

.jss23 {
    margin: 0px 12px;
}

.jss20 {
    margin-bottom: 48px;
}
.jss18 {
    width: 100%;
    margin: auto;
    max-width: 1000px;
}
.jss12 {
    color: #FFFFFF;
    background: #16ABF8;
}
.jss11 {
    border: none;
    height: 54px;
    margin: 0px 6px;
    font-size: 18px;
    min-width: 150px;
    font-weight: 600;
    border-radius: 45px;
    text-transform: capitalize;
}
.jss256 {
    display: flex;
    align-items: center;
    margin-bottom: 42px;
    justify-content: space-between;
}
.jss255 {
    width: 100%;
    margin: auto;
    max-width: 1000px;
}
.jss10 {
    color: #111111;
    font-size: 36px;
    font-weight: bold;
}
.jss12 {
    color: #FFFFFF;
    background: #16ABF8;
}
.jss11 {
    border: none;
    height: 54px;
    margin: 0px 6px;
    font-size: 18px;
    min-width: 150px;
    font-weight: 600;
    border-radius: 45px;
    text-transform: capitalize;
}
.jss260 {
    display: flex;
    flex-wrap: wrap;
}

.jss261 {
    margin: 0 12px 26px 0;
}
.jss262 {
    width: 230px;
    height: 230px;
    padding: 22px 27px;
    background: #FFFFFF;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
}

.jss263 {
    color: #111111;
    height: 162px;
    overflow: hidden;
    font-size: 18px;
    font-weight: bold;
}

.jss265 {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.jss264 {
    color: #888888;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
}

.jss125 {
    width: 235px;
    border: 1px solid #E5E5E5;
    background: #FFFFFF;
    box-shadow: 0px 6px 15px 5px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
}

.jss126 {
    display: flex;
    padding: 14px 23px;
    align-items: center;
    border-bottom: 1px solid #E5E5E5;
}

.jss127 {
    color: #4A4A4A;
    flex-grow: 1;
    font-size: 16px;
    margin-left: 16px;
}

.jss102 {
    top: 10px;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
}
.jss182 {
    width: 830px;
    background: #FFFFFF;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
}

.jss183 {
    display: flex;
    padding: 24px 47px 24px 30px;
    align-items: center;
    border-bottom: 1px solid #E5E5E5;
    justify-content: space-between;
}

.jss185 {
    padding: 38px 41px 24px 30px;
    border-bottom: 1px solid #E5E5E5;
}

.jss186 {
    color: #111111;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 9px;
}

.jss187 {
    width: 100%;
    margin-bottom: 26px;
}
.jss189 {
    color: #111111;
    border: 2px solid #E5E5E5;
    outline: none;
    padding: 14px;
    font-size: 16px;
    border-radius: 6px;
}

.jss188 {
    display: flex;
    padding: 15px 40px 19px;
    justify-content: flex-end;
}

.jss184 {
    color: #111111;
    font-size: 18px;
    font-weight: 600;
}

.jss190 {
    width: 205px;
    position: relative;
}

.jss191 {
    border: 1px solid #E5E5E5;
    display: flex;
    padding: 14px 17px;
    background: #FFFFFF;
    align-items: center;
    border-radius: 6px;
    justify-content: space-between;
}

.jss195 {
    display: flex;
    align-items: center;
}

.jss192 {
    width: 14px;
    height: 14px;
    background: #16ABF8;
    margin-right: 19px;
    border-radius: 50%;
}

.jss197 {
    color: #111111;
    font-size: 16px;
}

.jss12:disabled {
    opacity: 0.2;
}
.jss12 {
    color: #FFFFFF;
    background: #16ABF8;
}
.jss11 {
    border: none;
    height: 54px;
    margin: 0px 6px;
    font-size: 18px;
    min-width: 150px;
    font-weight: 600;
    border-radius: 45px;
    text-transform: capitalize;
}

</style>