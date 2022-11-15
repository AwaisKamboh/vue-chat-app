<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Add Room</div>
    
                    <div class="card-body">
                        <form @submit.prevent="formSubmit" >
                        <strong>Name:</strong>
                        <input type="text" class="form-control" v-model="name">
                        <strong>File:</strong>
                        <input type="file" class="form-control col-md-4" v-on:change="onFileChange">
                            <br>
                        <button   class="btn btn-success form-control">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


 <script>
import axios from 'axios';
    export default {
      name: "AddRoom",
        mounted() {
            console.log('Component mounted.')
        },
        data() {
            return {
              name: '',
              file: '',

            };
        },
        methods: {
            onFileChange(e){
                
                this.file = e.target.files[0];
                console.log(this.file);
            },
            formSubmit(e) {
               
                e.preventDefault();
                // let currentObj = this;
                 if(this.name != '' && this.file != '' ){
                const config = {
                    headers: { 
                    'Authorization' : `Bearer ${localStorage.getItem('access_token')}`,
                     'Content-Type': 'multipart/form-data',
                      'Accept': 'multipart/form-data',
                   
                    }
                }
    
                let formData = new FormData();
                formData.append('roomName', this.name);
                formData.append('file', this.file);
                axios.post('http://127.0.0.1:8000/api/create-room', formData, config)
                 .then((response) => {
                     console.log(response.data)
                    if (response.data.status == 'success') {
                    this.roomName = "";
                    this.$router.push("/");
                    } else {
                    alert("Something went wrong");
                    }
                })
                .catch(function () {
                    // currentObj.output = error;
                });
            }else{
                alert('Please fill all fields.')
            }
            }
        }
    }
// export default {
//   name: "AddRoom",
//   data() {
//     return {
//       roomName: "",
//       name: '',
//       file: '',
//     };
//   },
//   methods: {
//     onChange(e) {
//       this.file = e.target.files[0];
//     },    
//     add_room() {
//       if (this.roomName != "") {
//         HTTP.post("create-room", {
//           roomName: this.roomName,
//         })
//           .then((response) => {
//             if (response.data.status == "success") {
//               this.roomName = "";
//               this.$router.push("/");
//             } else {
//               alert("Something went wrong");
//             }
//           })
//           .catch((err) => {
//             console.log(err.response.data.message);
//           });
//       } else {
//         alert("Please write Room Name first");
//       }
//     },
//   },
// };
</script>
