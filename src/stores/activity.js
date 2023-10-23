import { defineStore } from 'pinia'
import axios from 'axios'

export const useActivityStore = defineStore('activity', {
  state: () => ({
    url: 'https://todo.api.devcode.gethired.id',
    email: 'trizkidinelvipratama@gmail.com',
    activities: [],
    todos: [],
    activity: {},
    showComponent: true,
    title: '',
    priority: 'very-high'
  }),
  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    async getActivities() {
      try {
        let activities = await axios({
          method: 'get',
          url: this.url + `/activity-groups?email=${this.email}`
        })
        this.activities = activities.data.data
      } catch (error) {
        console.log(error)
      }
    },
    async changePage() {
      this.showComponent = !this.showComponent
      this.title = ''
      this.priority = 'very-high'
    },
    async getActivityDetail(id) {
      try {
        let activity = await axios({
          method: 'get',
          url: this.url + `/activity-groups/` + id
        })
        this.activity = activity.data
        this.showComponent = !this.showComponent
      } catch (error) {
        console.log(error)
      }
    },
    async addActivity() {
      try {
        await axios({
          method: 'post',
          url: this.url + `/activity-groups`,
          data: {
            email: this.email,
            title: 'New Activity'
          }
        })
        this.getActivities()
      } catch (error) {
        console.log(error)
      }
    },
    async updateActivity(id, data) {
      try {
        await axios({
          method: 'patch',
          url: this.url + `/activity-groups/` + id,
          data: {
            title: data
          }
        })
        this.getActivities()
      } catch (error) {
        console.log(error)
      }
    },
    async updateTodoActive(id, activity_group_id, data) {
      try {
        await axios({
          method: 'patch',
          url: this.url + `/todo-items/` + id,
          data: {
            is_active: data
          }
        })
        this.getTodos(activity_group_id)
      } catch (error) {
        console.log(error)
      }
    },
    async getTodos(id) {
      try {
        let todos = await axios({
          method: 'get',
          url: this.url + `/todo-items?activity_group_id=` + id
        })
        this.todos = todos.data.data
        console.log(this.todos)
      } catch (error) {
        console.log(error)
      }
    },
    async addTodo(id) {
      try {
        await axios({
          method: 'post',
          url: this.url + `/todo-items`,
          data: {
            title: this.title,
            priority: this.priority,
            activity_group_id: id
          }
        })
        this.title = ''
        this.priority = 'very-high'
        this.getTodos(id)
      } catch (error) {
        console.log(error)
      }
    },
    async updateTodo(idTodo, activity_group_id) {
      try {
        await axios({
          method: 'patch',
          url: this.url + `/todo-items/${idTodo}`,
          data: {
            activity_group_id,
            id: idTodo,
            priority: this.priority,
            title: this.title
          }
        })
        this.getTodos(activity_group_id)
      } catch (error) {
        console.log(error)
      }
    },
    async deleteActivity(id) {
      try {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axios({
              method: 'delete',
              url: this.url + `/activity-groups/${id}`
            })
            this.getActivities()
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    async deleteTodo(id, activity_group_id) {
      try {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axios({
              method: 'delete',
              url: this.url + `/todo-items/${id}`
            })
            this.getTodos(activity_group_id)
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
})
