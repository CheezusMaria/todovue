<template>
  <div>
    <!--task Table-->

    <h1 class="text-center mt-5" style="color: red">Things To Do</h1>
    <div>
      <b-form-select v-model="selection1" :options="options"></b-form-select>
      <b-button
        size="sm"
        align-v="center"
        class="ms-2 btn btn-danger"
        @click="deleteSelectedTasks"
        >Delete</b-button
      >
      <!-- DENEME DENEMEDENEMEDENEMEDENEMEDENEMEDENEMEDENEMEDENEMEDENEMEDENEMEDENEMEDENEMEDENEME-->
      <b-form-select
        v-model="action1"
        :options="options"
        @change="(evt) => evt.value === action1"
      ></b-form-select>
      <b-button
        size="sm"
        align-v="center"
        class="ms-2 btn btn-warning"
        @click="applySelectedTasks"
        >Apply</b-button
      >
    </div>

    <div class="d-flex">
      <input type="checkbox" @change="checkAll" v-model="isCheckAll" />Check All
    </div>
    <table class="table mt-2 overflow-auto">
      <thead class="overflow-auto" data-type="scroll">
        <tr>
          <th scope="col">Task</th>
          <th scope="col">Status</th>
          <th scope="col">Description</th>
          <th scope="col">DeadLine</th>
          <th scope="col" class="text-center">Edit</th>
          <th scope="col" class="text-center">Delete</th>
        </tr>
      </thead>
      <tbody class="overflow-auto" data-type="scroll">
        <tr v-for="(task, index) in filteredTasks" :key="index">
          <td class="overflow-auto" data-type="scroll">
            <input
              type="checkbox"
              v-model="task.isChecked"
              @change="checkList"
            />

            <span
              data-spy="scroll"
              :class="{ completed: task.status === 'completed' }"
            >
              {{ task.name }}
            </span>
          </td>
          <td style="width: 120px">
            <select
              @change="changeStatus(index)"
              name=""
              id=""
              class="pointer"
              :class="{
                'text-danger': task.status === 'to-do',
                'text-warning': task.status === 'in progress',
                'text-success': task.status === 'completed',
              }"
            >
              <option value="to-do" :selected="task.status === 'to-do'">
                To-do
              </option>
              <option
                value="in progress"
                :selected="task.status === 'in progress'"
              >
                In-Progress
              </option>
              <option value="completed" :selected="task.status === 'completed'">
                Completed
              </option>
            </select>
          </td>
          <td>{{ task.description }}</td>
          <td>{{ task.deadline }}</td>

          <td>
            <div class="text-center pointer" @click="editTask(index)">
              <span class="fa fa-pen"></span>
            </div>
          </td>
          <td>
            <div class="text-center pointer" @click="showConfirmSingle(index)">
              <span class="fa fa-trash"></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import { eventBus } from "../event";

export default {
  name: "todoPart",
  data() {
    return {};
  },
};
</script>
//inputparta eklenen sey this.tasksin icine pushlanicak 

<style scoped>
.pointer {
  cursor: pointer;
}
.completed {
  text-decoration: line-through;
}
.warning-req {
  color: red;
}
/* 
    this.toastCount++
          this.$bvToast.toast('Task Created Successfully',{
            title:'BootstrapVue Toast',
            autoHideDelay : 5000,
            
          }) */
</style>