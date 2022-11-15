<template>

  <div class="text-left">
     
    <div class="main-content-wrap sidenav-open d-flex flex-column">
      <div class="row">
        <button
          @click="addRoom()"
          class="btn btn-primary ml-4"
          style="width: 150px"
        >
          Add new Room
        </button>
        <button
          @click="logout()"
          class="btn btn-primary ml-3"
          style="width: 150px"
        >
          Logout
        </button>
       
      </div>

      <!-- ============ Body content start ============= -->
      <div class="main-content">
        <!-- MAIN SIDEBAR CONTAINER-->
        <div class="inbox-main-sidebar-container" data-sidebar-container="main">
          <div class="inbox-main-content" data-sidebar-content="main">
            <!-- SECONDARY SIDEBAR CONTAINER-->
            <div
              class="inbox-secondary-sidebar-container box-shadow-1"
              style="height: 520px"
              data-sidebar-container="secondary"
            >
              <!-- Secondary Inbox sidebar-->
              <div
                style="
                  float: left;
                  border: solid 1px #ddd;
                  height: 520px;
                  overflow-y: scroll;
                  
                "
                class="inbox-secondary-sidebar perfect-scrollbar rtl-ps-none"
                data-sidebar="secondary"
              >
                <div v-for="(room, i) in rooms" :key="i">
                  <div
                    v-if="room.id == room_id"
                    style="background-color: #c0c0c0;"
                    @click="getChatRoomsMsg(room.id)"
                    class="mail-item"
                  >
                    <div class="avatar">
                      <img
                        :src="'http://127.0.0.1:8000'+room.image.path"
                        alt=""
                      />
                    </div>
                    <div class="col-xs-6 details"><span class=""><b>{{ room.name }}</b></span>
                      <br>
                        <p v-if="room.messages.length > 0" style=" display: inline-block;
                      width: 140px;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                     ;" 
                      class="m-0">
                      <b>{{room.messages[room.messages.length-1].user.name}}:</b> {{room.messages[room.messages.length-1].message}}
                      </p>
                    </div>
                    <div class="col-xs-3 date">
                      <vue-moments-ago v-if="room.messages.length > 0"  prefix="" suffix="ago" :date="room.messages[room.messages.length-1].created_at" lang="en" />
                    </div>
                  </div>
                  <div
                    v-if="room.id != room_id"
                    @click="getChatRoomsMsg(room.id)"
                    class="mail-item"
                  >
                  <span v-if="views.includes(room.id)"><h1 style="color:#663399">*</h1></span>
                    <div class="avatar">
                      <img
                        :src="'http://127.0.0.1:8000'+room.image.path"
                        alt=""
                      />
                    </div>
                    <div class="col-xs-6 details">
                      <span class=""><b>{{ room.name }}</b></span>
                      <br>
                      <p v-if="room.messages.length > 0" style=" display: inline-block;
                      width: 140px;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;" 
                      class="m-0">
                     <b>{{room.messages[room.messages.length-1].user.name}}:</b> {{room.messages[room.messages.length-1].message}}
                      </p>
                    </div>
                    <div class="col-xs-3 date">
                 
                        <vue-moments-ago v-if="room.messages.length > 0" prefix="" suffix="ago" :date="room.messages[room.messages.length-1].created_at" lang="en" />
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="card-body scroll"
                data-mdb-perfect-scrollbar="true"
                style="overflow-y: scroll; position: relative; height: 520px"
              >
                <div class="divider d-flex align-items-center mb-4">
                  <p class="text-center mx-3 mb-0" style="color: #a2aab7">
                    Today
                  </p>
                </div>
                <div v-for="(message, i) in messages" :key="i">
                  <div
                    v-if="message.user.id == auth_id"
                    class="d-flex flex-row justify-content-end mb-4 pt-1"
                  >
                    <div>
                      <p
                        style="border-radius: 5px"
                        class="p-2 me-3 mb-1 text-white rounded-3 bg-primary"
                      >
                       <b>{{ message.user.name }}</b><br />{{
                          message.message
                        }}
                      </p>

                      <p
                        class="
                          small
                          me-3
                          mb-3
                          rounded-3
                          text-muted
                          d-flex
                          justify-content-end
                        "
                      >
                       <vue-moments-ago v-if="message"  prefix="" suffix="ago" :date="message.created_at" lang="en" />
                      </p>
                    </div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                      alt="avatar 1"
                      style="width: 45px; height: 100%"
                    />
                  </div>

                  <div
                    v-if="message.user.id != auth_id"
                    class="d-flex flex-row justify-content-start"
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                      alt="avatar 1"
                      style="width: 45px; height: 100%"
                    />
                     <span v-if="message.user.is_online === 1"   class="green_icon"></span>
                    <div>
                      <p
                        class="p-2 ms-3 mb-1 rounded-3"
                        style="background-color: #f5f6f7; border-radius: 5px"
                      >
                        <b>{{ message.user.name }}</b><br />{{
                          message.message
                        }}
                      </p>
                      <vue-moments-ago v-if="message" prefix="" suffix="ago" :date="message.created_at" lang="en" />
                    </div>
                  </div>
                </div>
                     <VEmojiPicker
                    v-show="showDialog"
                    :style="{ width: '300px', height: '200', float: 'right' }"
                    labelSearch="Search"
                    @select="onSelectEmoji"
                  />
              </div>
              
              <div v-if="room_id != 0"
                style="float: right; width: 950px"
                class="
                  card-footer
                  text-muted
                  d-flex
                  justify-content-start
                  align-items-center
                  p-3
                "
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                  alt="avatar 3"
                  style="width: 40px; height: 100%"
                />
                <input
                  v-on:keyup.enter="sendMsg()"
                  type="text"
                  v-model="msgStore"
                  class="form-control form-control-lg"
                  id="exampleFormControlInput1"
                  placeholder="Type message..."
                />
                <button @click="toogleDialogEmoji" class="btn btn-lg">😃</button>
              
                <button
                  v-on:click="sendMsg()"
                  class="btn btn-success btn-lg ml-1"
                >
                  Send
                </button>
        
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 <!-- ============ Search UI End ============= -->
    <script src="@/assets/dist-assets/js/plugins/jquery-3.3.1.min.js"></script>
    <script src="@/assets/dist-assets/js/plugins/bootstrap.bundle.min.js"></script>
    <script src="@/assets/dist-assets/js/plugins/perfect-scrollbar.min.js"></script>
    <script src="@/assets/dist-assets/js/scripts/script.min.js"></script>
    <script src="@/assets/dist-assets/js/scripts/sidebar.large.script.min.js"></script>
    <script src="@/assets/dist-assets/js/scripts/sidebar.script.min.js"></script>
<script>
import HTTP from "@/common/http-common";
import VueMomentsAgo from 'vue-moments-ago';
import { VEmojiPicker, emojisDefault, categoriesDefault } from "v-emoji-picker";
export default {
  name: "HomeView",
   components: {
    VueMomentsAgo,
    VEmojiPicker
  },
  data() {
    return {
      rooms: [],
      messages: [],
      auth_id: 0,
      msgStore: "",
      room_id: 0,
      views: [],
      music: require('@/assets/MessageTone.mp3'),
      showDialog: false,
    };
  },

  methods: {
      toogleDialogEmoji() {
      console.log("Toogle!");
      this.showDialog = !this.showDialog;
    },
        onSelectEmoji(emoji) {
      this.msgStore += emoji.data;
      // Optional
      // this.toogleDialogEmoji();
    },
    playAudio() {
      var x = new Audio(this.music);
      var playPromise = x.play();
      if (playPromise !== undefined) {
          playPromise.then(_ => {
                  x.play()
          }).catch(error => {
          });
      }
      },
    getChatRooms() {
      HTTP.get("chatrooms")
        .then((response) => {
          if (response.data.status == "success") {
            let data = response.data.data;
            this.rooms = data;
            this.views = response.data.views;
            console.log(this.views)
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    getChatRoomsMsg(roomId) {
      HTTP.get("chatroom/messages/" + roomId)
        .then((response) => {
          if (response.data.status == "success") {
            let data = response.data.data;
            this.messages = data;
            this.auth_id = response.data.auth;
            this.room_id = roomId;
            this.getChatRooms()
            localStorage.setItem('roomId', roomId)
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },

    sendMsg() {
        if(this.msgStore != ''){
      HTTP.post("sendMsg", {
        message: this.msgStore,
        room_id: this.room_id,
      })
        .then((response) => {
          if (response.data.status == "success") {
            this.msgStore = "";
            this.getChatRooms()
            this.getChatRoomsMsg(this.room_id);
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    }else {
        alert('Please write message first')
    }
    },

    addRoom() {
        this.$router.push("/addRoom");
    },

    logout() {
      HTTP.post("logout")
        .then((response) => {
          if (response.data.status == "success") {
            localStorage.removeItem("access_token");
            this.$router.push("/login");
            this.getChatRoomsMsg(localStorage.removeItem('roomId'));
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    scrollToEnd() {
      var container = document.querySelector(".scroll");
      var scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
    },
  },
  created() {
    this.getChatRooms();
    this.getChatRoomsMsg(localStorage.getItem('roomId'));
    if (!localStorage.getItem("access_token")) {
      this.$router.push("/login");
    }
  },

  mounted() {
      //  window.setInterval(() => {
      //     this.getChatRoomsMsg(this.room_id)
      // }, 1000)
    this.$echo.channel("synchronized").listen("SendMessage", (payload) => {
      console.log(payload);
       this.playAudio()
       this.getChatRooms();
       this.getChatRoomsMsg(localStorage.getItem('roomId'));
    });

    this.scrollToEnd();
  },
  updated() {
    this.scrollToEnd();
  },
};
</script>
<style scoped>
#EmojiPicker
{
  position: absolute;
  right: 0;
}
.green_icon{
         background-color: #4cd137;
         position: absolute;
         height: 2%;
         width: 2%;
         /* border:5px solid white; */
         border-radius: 60%;
}
</style>
