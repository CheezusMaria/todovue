<template>
  <div></div>
</template>

<script>
window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  e.returnValue = "";
});
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
      actions: [
        { value: null, text: "Choose Action" },
        { value: "make to-do", text: "To-Do" },
        { value: "make in progress", text: "In Progress" },
        { value: "make completed", text: "Completed" },
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
      action1: null,
      selector: null,
      isChecked: false,
      isCheckAll: false,
      saveAsNewCheck: true,
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
    deneme() {
      console.log(this.saveAsNewCheck);
    },
    deleteSelectedTasks() {
      this.$confirm({
        title: "Confirm",
        message: "This Will Remove Selected Tasks. Do You Wanna Continue ?",
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

    applySelectedTasks() {
      console.log(this.action1);
      for (let counter = this.tasks.length - 1; counter >= 0; counter--) {
        if (this.tasks[counter].isChecked == true) {
          //reactive atamalar $set islemi
          //exp
          // this.$set(this,"action1" , "completed");
          // this["action1"] = "completed";

          this.$set(this.tasks[counter], "status", this.action1);
          // this.tasks[counter].status = this.action1;
        }
      }
    },
    /*manupilating all checkboxes by using 'checkall' checkbox, it also works vice versa */
    checkList() {
      //using some func to checkall box
      this.isCheckAll = !this.tasks.some((el) => el.isChecked == false);
    },
    //using filter func for checkall box
    // this.tasks.filter((el) => el.isChecked == false).length == 0;
    checkAll(event) {
      this.tasks.forEach((task) => {
        task.isChecked = this.isCheckAll;
      });
      console.log(event);
    },
    changeStatus(index) {
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
    /*change background color func */
    changeColor() {
      console.log(this.index);
      if (this.index === 8) {
        this.$set(this, "index", 0);
      } else {
        this.index++;
      }
    },
    /* changestatus func by click, it takes the information from availablestatus array , changestatus1 func is used in project
    changeStatus(index) {
      let newIndex = this.availableStatus.indexOf(this.tasks[index].status);
      if (++newIndex > 2) newIndex = 0;
      this.tasks[index].status = this.availableStatus[newIndex];
    }, */
    firstCharUpper(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    editTask(index) {
      this.task = this.tasks[index].name;
      this.description = this.tasks[index].description;
      this.editedTask = index;
      this.dateValue = this.tasks[index].deadline;
      console.log(this.dateValue);
      console.log(this.tasks[index].deadline);
    },
    // editBtn() {
    //   this.tasks[this.editedTask].name = this.task;
    //   this.tasks[this.editedTask].description = this.description;
    //   this.tasks[this.editedTask].deadline = this.dateValue;
    //   this.isChecked = false;
    //   localStorage.setItem("tasks", JSON.stringify(this.tasks));
    //   this.editedTask = null;
    //   this.counter++;
    // },
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