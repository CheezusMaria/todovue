<template>
  <div class="container mb-5" style="max-width: 800px" >
    <!--Title-->
    <h1 class="text-center mt-5" >ToDo Project</h1>
    <!--Inputs for todo-->

    <div>
      <!--V model is used to create two way data bindings -->
      <input v-model="task" type="text" placeholder="What Is Your Task" class="w-100 form-control mt-3">
      <textarea v-model="description"  cols="70" rows="3" placeholder="Description Of The Task" class="mt-3" ></textarea>
      <label class="mt-3" for="example-datepicker">Choose Your Deadline</label>
      <b-form-datepicker id="example-datepicker" v-model="dateValue" class="mb-2"></b-form-datepicker>
     <!-- <p>Value: '{{ value }}'</p> --> 
      <div class="text-center" align-v="center">
        <b-button pill variant="success" size="lg" align-v="center" class="mt-5"  @click="submitTask" >Submit Your Task</b-button>
      </div>
      <!--task Table-->
    </div>
    <h1 class="text-center mt-5" style="color:red" >Things To Do</h1>
    <table class="table mt-5">
  <thead>
    <tr>
      <th scope="col" >Task</th>
      <th scope="col" >Status</th>
      <th scope="col" >Description</th>
      <th scope="col" >DeadLine</th>
      <th scope="col" class="text-center">#</th>
      <th scope="col" class="text-center">#</th>
      
    </tr>
  </thead>
  <tbody>
    <tr v-for="(task, index) in tasks" :key="index">
      <td>{{task.name}}</td>
      <td>{{task.status}}</td>
      <td>{{task.description}}</td>
      <td>{{task.deadline}}</td>
      
      <td>
        <div class="text-center" @click="editTask(index)" >
          <span class="fa fa-pen" ></span>
        </div>

      </td>
      <td>
        <div class="text-center" @click="deleteTask(index)"  >
          <span class="fa fa-trash"></span>
        </div>
      </td>
    </tr>
   
  </tbody>
</table>
    

  </div>
    
</template>

<script>
export default {
  name: 'todoApp',
  data(){
    return{
      value:'',
      task:"",
      description:"",
      dateValue: "",
      tasks:[
        {
          name : 'Learn Something New',
          description : 'learn About python flask',
          deadline : '2022-02-02',
          status : 'in-progress'

        },

        {
          name : 'do workout',
          description : 'hiit training',
          deadline : '2022-02-02',
          status : 'to-do'
        }
      ]

      }
    },
    methods: {
      submitTask(){

        if(this.task.length === 0) return;

        this.tasks.push({
          name : this.task,
          status : "to-do",
          description: this.description,
          deadline: this.dateValue,

          
        }),
        this.task = ""
        this.description = ""
        this.dateValue = ""

      },

      /* !!!!!!!!!! */
      deleteTask(index){
        this.tasks.splite(index,1)
      },

      editTask(index){
        this.task = this.tasks[index].name;
        this.description = this.tasks[index].description;

        /* !!!!!!!!! */
        this.dateValue= this.tasks[index].dateValue;
      }
      

    }


  };
    
</script>


<style scoped>

</style>
