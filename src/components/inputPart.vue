<template>
  <div :class="`container mb-5 `" style="max-width: 800px">
    <h1 class="text-center mt-5">ToDo List.</h1>
    <!--Inputs for todo-->

    <div>
      <!--V model is used to create two way data bindings -->
      <vue-confirm-dialog></vue-confirm-dialog>
      <input
        v-model="task.name"
        type="text"
        placeholder="What Is Your Task"
        class="w-100 form-control mt-3"
      />
      <div class="error" v-if="!$v.task.required && submitStatus == 'ERROR'">
        <span class="warning-req">You Have To Fill The Task Area..</span>
      </div>
      <textarea
        v-model="task.description"
        cols="70"
        rows="3"
        placeholder="Description Of The Task"
        class="mt-3"
      ></textarea>
      <label class="mt-3" for="example-datepicker">Choose Your Deadline</label>
      <b-form-datepicker
        id="example-datepicker"
        v-model="task.dateValue"
        class="mb-2"
      ></b-form-datepicker>
      <input type="checkbox" v-model="saveAsNewCheck" @change="deneme" /> Save
      As New Task
      <div class="error" v-if="!$v.task.required && submitStatus == 'ERROR'">
        <span class="warning-req">You Have To Fill The Task Area..</span>
      </div>
      <!-- <p>Value: '{{ value }}'</p> -->

      <div class="text-center d-flex justify-content-around">
        <b-button
          pill
          variant="success"
          size="lg"
          align-v="center"
          class="mt-5"
          @click="submitTaskx"
          >Submit</b-button
        >
      </div>
    </div>
  </div>
</template>


<script>
// import { eventBus } from "../event";
import { required } from "vuelidate/lib/validators";
import { eventBus } from "../event";
export default {
  name: "inputPart",
  data() {
    return {
      saveAsNewCheck: true,
      task: {
        name: "",
        description: "",
        deadline: "",
        status: "",
        isChecked: false,
      },
    };
  },
  methods: {
    deneme() {
      console.log(this.saveAsNewCheck);
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
    submitTask() {
      if (this.task.length === 0) return;
      if (this.saveAsNewCheck == true) {
        this.tasks.push({
          name: this.task,
          status: "to-do",
          description: this.description,
          deadline: this.dateValue,
          isChecked: false,
        });
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      } else if (this.editedTask === null) {
        window.alert("Please Save Your Task As A New");
      } else {
        this.tasks[this.editedTask].name = this.task;
        this.tasks[this.editedTask].description = this.description;
        this.tasks[this.editedTask].deadline = this.dateValue;
        this.isChecked = false;
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.editedTask = null;
        this.counter++;
      }
      this.task = "";
      this.description = "";
      this.dateValue = "";
    },
  },
  validations: {
    task: {
      required,
    },
  },
  mounted() {
    var self = this;
    eventBus.$on("deneme", (value) => self.$set(self, "task", value));
  },
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