<script>
import ActivityCard from '../components/ActivityCard.vue'
import TodoCard from '../components/TodoCard.vue'
import Navbar from '../components/Navbar.vue'
import { mapActions,mapState,mapWritableState } from 'pinia'
import { useActivityStore } from '../stores/activity'
import _ from 'lodash';


export default {
  components: {
    ActivityCard,
    TodoCard,
    Navbar
  },
  data() {
    return {
      isSort: false,
      isSort: false,
      isUpdateTitle:false,
      isEditing: false,
      idTodo: 0,
      allTodo :[],
     
    }
  },
  methods: {
    ...mapActions(useActivityStore, ['getActivities','addActivity','changePage','addTodo','updateActivity','updateTodo']),
    addActivityHandler(){
      this.addActivity()
    },
  
    changePageHandler(){
      this.changePage ()
    },
    submitHandler(){
      if (this.isEditing) {
        this.updateTodo (this.idTodo,this.activity.id,)
      }else{
        this.addTodo (this.activity.id)
      }
    },
    handleInputChange() {
      this.updateActivity(this.activity.id, this.activity.title);
    },
    changeElement(){
      this.isUpdateTitle = !this.isUpdateTitle
    },
    showElementSort(){
      this.isSort = !this.isSort
    },
    handleSort(keySort) {
      if (this.allTodo.length === 0) {
        this.allTodo = [...this.todos]; 
      }

      switch (keySort) {
        case "terbaru":
          this.todos = [...this.allTodo]; 
          break;
        case "terlama":
          this.todos = [...this.allTodo]; // Menduplikat isi this.allTodo ke this.todos
          this.todos = this.todos.reverse();
          break;
        case "A-Z":
          this.todos = [...this.allTodo]; // Menduplikat isi this.allTodo ke this.todos
          this.todos = _.orderBy(this.todos, ['title'], ['asc']);
          break;
        case "Z-A":
          this.todos = [...this.allTodo]; // Menduplikat isi this.allTodo ke this.todos
          this.todos = _.orderBy(this.todos, ['title'], ['desc']);
          break;
        case "belum-selesai":
          this.todos = [...this.allTodo]; // Menduplikat isi this.allTodo ke this.todos
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
      this.title = "";
      this.priority = "very-high";
    },
  },
  computed: {
    ...mapState(useActivityStore, ['activities','showComponent','activity']),
    ...mapWritableState(useActivityStore, ['title','priority','todos']),
    
  },
  created(){
    this.getActivities()
  }
}
</script>

<template>
  <Navbar/>
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
        <ActivityCard v-for="activity in activities" :key="activity.id" :activity="activity" />
      </div>
      <img v-if="activities.length === 0" data-cy="activity-empty-state" src="https://todo-devcode.web.app/static/media/activity-empty-state.5f1bc10d.png
" alt="add-activity" class="jss216" @click="addActivityHandler">
    </div>
    </section>

    <!-- =============================== hal2====================== -->
    <section :class="{ 'hidden': showComponent }">
      <div class="jss18">
        <div class="jss25 jss26 jss20">
          <div class="jss25">
            <svg width="32" @click="changePageHandler" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" data-cy="todo-back-button" class="jss23"><path d="M6.66675 16L14.6667 24" stroke="#111111" stroke-width="5" stroke-linecap="square"></path><path d="M6.66675 16L14.6667 8" stroke="#111111" stroke-width="5" stroke-linecap="square"></path></svg>
            <h1 class="jss10" data-cy="todo-title" v-if="!isUpdateTitle">{{ activity.title }}</h1>
            <input type="text" class="form-control border-0  bg-transparent input-h1-size" v-model="activity.title" @change="handleInputChange" v-if="isUpdateTitle" />
            <svg @click="changeElement" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-cy="todo-title-edit-button" class="jss23"><path d="M4 19.9998H8L18.5 9.49981C19.0304 8.96938 19.3284 8.24996 19.3284 7.49981C19.3284 6.74967 19.0304 6.03025 18.5 5.49981C17.9696 4.96938 17.2501 4.67139 16.5 4.67139C15.7499 4.67139 15.0304 4.96938 14.5 5.49981L4 15.9998V19.9998Z" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13.5 6.49982L17.5 10.4998" stroke="#A4A4A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>

          <!-- sort -->
          <div role="tooltip" id="simple-popper" style="position: absolute; top: 200px; left: 0px; transform: translate3d(1133px, 5px, 0px); will-change: transform;" x-placement="top" v-if="isSort">
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
          <TodoCard v-for="todo in todos" :key="todo.id" :todo="todo" />
      <!-- img -->
      <img v-if="todos.length === 0"  data-cy="todo-empty-state" src="https://todo-devcode.web.app/static/media/todo-empty-state.a0b4b794.png" alt="add-todo" class="jss22" >
    </div>
    </section>
  </div>

  <!-- modal -->

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            <input class="jss189 jss187" data-cy="modal-add-name-input" placeholder="Tambahkan nama list item" v-model="title">
            <div data-cy="modal-add-priority-title" class="jss186">PRIORITY</div>
            <select class="form-select" aria-label="Default select example" v-model="priority">
              <option value="very-high" selected>Very High</option>
              <option value="high">High</option>
              <option value="normal">Medium</option>
              <option value="low">Low</option>
              <option value="very-low">Very Low</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
        </div>
      </form>
    </div>
  </div>
</div>



</template>

<style>
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