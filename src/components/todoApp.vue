<template>
  <div
    :class="`container mb-5  bg-${colorChanger[index]} `"
    style="max-width: 800px"
  >
    <!--Title-->
    <h1 class="text-center mt-5">ToDo List.</h1>
    <!--Inputs for todo-->

    <div>
      <!--V model is used to create two way data bindings -->
      <vue-confirm-dialog></vue-confirm-dialog>
      <input
        v-model="task"
        type="text"
        placeholder="What Is Your Task"
        class="w-100 form-control mt-3"
      />
      <div class="error" v-if="!$v.task.required && submitStatus == 'ERROR'">
        <span class="warning-req">You Have To Fill The Task Area..</span>
      </div>
      <textarea
        v-model="description"
        cols="70"
        rows="3"
        placeholder="Description Of The Task"
        class="mt-3"
      ></textarea>
      <label class="mt-3" for="example-datepicker">Choose Your Deadline</label>
      <b-form-datepicker
        id="example-datepicker"
        v-model="dateValue"
        class="mb-2"
      ></b-form-datepicker>
      <!-- <p>Value: '{{ value }}'</p> -->

      <div class="text-center d-flex justify-content-around">
        <b-button
          pill
          variant="success"
          size="lg"
          align-v="center"
          class="mt-5"
          @click="submitTaskx"
          >Submit Your Task</b-button
        >
        <b-button
          pill
          variant="warning"
          size="lg"
          align-v="center"
          class="mt-5 ms-5"
          @click="editBtn"
          >Edit Your Task</b-button
        >
        <b-button
          pill
          variant="danger"
          size="lg"
          align-v="center"
          class="mt-5 ms-5"
          @click="showConfirm"
          >Clear All Tasks</b-button
        >

        <!-- <b-button
          pill
          variant="danger"
          size="lg"
          align-v="center"
          class="mt-5 ms-5"
          @click="TEST"
          >TEST</b-button
        > -->
        <!-- <b-button
          pill
          variant="info"
          size="lg"
          align-v="center"
          class="mt-5 ms-5"
          @click="changeColor"
          >Change The Color</b-button
        > -->
      </div>

      <!--task Table-->
    </div>
    <h1 class="text-center mt-5" style="color: red">Things To Do</h1>
    <div>
      <b-form-select v-model="selection1" :options="options"></b-form-select>
      <b-button
        size="sm"
        align-v="center"
        class="ms-2 btn btn-danger"
        @click="TEST"
        >TEST</b-button
      >

      <!-- <b-dropdown
        v-model="selection1"
        id="dropdown-1"
        text="Selection"
        class="m-md-2"
        @click.native="setSelection"
      >
        <b-form-select>All</b-form-select>
        <b-b-form-select-item>Finished</b-form-select>
        <b-form-select>In-Progress</b-form-select>
        <b-dropdown-item>To-Do</b-dropdown-item>
      </b-dropdown> -->
    </div>

    <div class="d-flex">
      <input type="checkbox" @change="checkAll" v-model="isCheckAll" />
      <p class="mt-3">Check All</p>
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
              @change="changeStatus1(index)"
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
            <div class="text-center" @click="editTask(index)">
              <span class="fa fa-pen"></span>
            </div>
          </td>
          <td>
            <div class="text-center" @click="showConfirmSingle(index)">
              <span class="fa fa-trash"></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "todoApp",
  data() {
    return {
      optionsCheck: [
        { value: "selectAll", text: "All" },
        { value: "clearAllSelection", text: "None" },
      ],
      options: [
        { value: null, text: "All Tasks" },
        { value: "to-do", text: "To-Do" },
        { value: "in progress", text: "In Progress" },
        { value: "completed", text: "Completed" },
      ],
      availableStatus: ["to-do", "in progress", "completed"],
      value: null,
      task: null,
      description: null,
      dateValue: null,
      editedTask: null,
      index: 0,
      toastCount: 0,
      selection1: null,
      selector: null,
      isChecked: false,
      isCheckAll: false,
      colorChanger: [
        "white",
        "info",
        "primary",
        "warning",
        "danger",
        "success",
        "secondary",
        "light",
        "dark",
      ],
      newStatus: null,
      submitStatus: null,
      toastCOunt: 0,
      tasks: [
        {
          name: "Learn Something New",
          description: "learn About python flask",
          deadline: "2022-02-02",
          status: "in progress",
          isChecked: false,
        },
        {
          name: "do workout",
          description: "hiit training",
          deadline: "2022-02-02",
          status: "to-do",
          isChecked: true,
        },
        {
          name: "learn Vue.js",
          description: "remake the project with Vuex",
          deadline: "2022-02-02",
          status: "completed",
          isChecked: false,
        },
      ],
    };
  },
  validations: {
    task: {
      required,
    },
  },
  methods: {
    TEST() {
      this.$confirm({
        title: "Confirm",
        message: "This Will Remove All Your Tasks. Do You Wanna Continue ?",
        button: {
          yes: "Yes",
          no: "Cancel",
        },
        callback: () => {
          for (let counter = this.tasks.length - 1; counter >= 0; counter--) {
            if (this.tasks[counter].isChecked == true) {
              this.tasks.splice(counter, 1);
            }
          }
          localStorage.setItem("tasks", JSON.stringify(this.tasks));
        },
      });
    },

    checkList() {
      this.isCheckAll =
        this.tasks.filter((el) => el.isChecked == false).length == 0;
    },
    checkAll(event) {
      this.tasks.forEach((task) => {
        task.isChecked = this.isCheckAll;
      });
      console.log(event);
    },
    //checkAll() {
    //let items = document.getElementsByName("checkTodo");
    //for (let i = 0; i < items.length; i++) {
    //if (items[i].type == "checkBox") items[i].checked = true;
    // }
    //console.log("checkall calisti");
    // },
    setSelection(value) {
      console.log(value);
      //  @change="(value) => $set('selection1', value)"
    },
    testStat() {},
    changeStatus1(index) {
      this.tasks[index].status = event.target.value;
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    /* confirmation pop up to remove all tasks */
    showConfirm() {
      this.$confirm({
        title: "Confirm",
        message: "This Will Remove All Your Tasks. Do You Wanna Continue ?",
        button: {
          yes: "Yes",
          no: "Cancel",
        },
        callback: (confirm) => {
          let counter = this.tasks.length;
          if (confirm == true) {
            this.tasks.splice(0, this.tasks.length);
            console.log(counter);
          } else {
            return;
          }
        },
      });
    },
    /**confirming pop up to deleting single task */
    showConfirmSingle(index) {
      this.$confirm({
        title: "Confirm",
        message: "This Task Will Be Removed?",
        button: {
          yes: "Yes",
          no: "Cancel",
        },
        callback: (confirm) => {
          if (confirm == true) {
            this.tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
          }
        },
      });
    },
    /*   deleteTask(index){
        this.tasks.splice(index,1)
      },*/
    /*change background color func */
    changeColor() {
      console.log(this.index);
      if (this.index === 8) {
        this.$set(this, "index", 0);
      } else {
        this.index++;
      }
    },
    /* cahgestatus dropdown a gomulecek */
    changeStatus(index) {
      let newIndex = this.availableStatus.indexOf(this.tasks[index].status);
      if (++newIndex > 2) newIndex = 0;
      this.tasks[index].status = this.availableStatus[newIndex];
    },
    firstCharUpper(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    submitTask() {
      if (this.task.length === 0) return;
      else {
        this.tasks.push({
          name: this.task,
          status: "to-do",
          description: this.description,
          deadline: this.dateValue,
          isChecked: false,
        });
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      }
      this.task = "";
      this.description = "";
      this.dateValue = "";
    },
    submitTaskx() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitTask();
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
    editTask(index) {
      this.task = this.tasks[index].name;
      this.description = this.tasks[index].description;
      this.editedTask = index;
      this.dateValue = this.tasks[index].deadline;
      console.log(this.dateValue);
      console.log(this.tasks[index].deadline);
    },
    editBtn() {
      this.tasks[this.editedTask].name = this.task;
      this.tasks[this.editedTask].description = this.description;
      this.tasks[this.editedTask].deadline = this.dateValue;
      this.isChecked = false;
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      this.editedTask = null;
      this.counter++;
    },
  },
  /* adding tasks into local storage */
  mounted() {
    /*localStorage.setItem("isim", "Mustafa" )
        alert(localStorage.getItem("isim")) */
    if (localStorage.getItem("tasks")) {
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
    }
  },
  /*disarida tutulan bir object local storage da degisikliklerimi yapicak*/
  /*when u need to change data you use methods , when u need to change the presentation of existing data you use computed */
  computed: {
    filteredTasks() {
      let x = this.selection1;
      console.log(x);
      return this.tasks.filter(function (task) {
        if (x === null) return true;
        return task.status === x;
      });
    },
  },
  // watch: {
  //   tasks: {
  //     handler(updatedTasks) {
  //       localStorage.tasks = JSON.stringify(updatedTasks);
  //     },
  //     deep: true,
  //   },
  // },
};
</script>


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