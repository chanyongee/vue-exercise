<template>
  <div id="container">
    <div class="page-header">
    <h1 class="text-center">연락처 관리 애플리케이션</h1>
    </div>
    <component :is="currentView" :contact="contact"></component>
    <contactList :contactlist="contactlist"></contactList>
    <paginate
      ref="pagebuttons"
      :page-count="totalpage"
      :page-range="7"
      :margin-pages="3"
      :click-handler="pageChanged"
      :prev-text="'이전'"
      :next-text="'다음'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    ></paginate>
  </div>
</template>

<script>
import ContactList from './components/ContactList.vue';
import AddContact from './components/AddContact.vue';
import UpdateContact from './components/UpdateContact.vue';
import UpdatePhoto from './components/UpdatePhoto.vue';
import CONF from './Config.js';
import Paginate from 'vuejs-paginate';
import eventBus from './Eventbus.js';

export default {
  components: { ContactList, AddContact, UpdateContact, UpdatePhoto, Paginate },
  data() {
    return {
      currentView: null,
      contact: { no: 0, name: '', tel: '', address: '', photo: '' }, // 사용자 보기, 추가, 수정에 사용할 폼 데이터
      contactlist: {
        pageno: 1, pagesize: CONF.PAGESIZE, totalcount: 0, contacts: [] // 페이지에 보여지는 리스트 정보
      }
    }
  } ,
  mounted() {
    this.fetchContacts();  // 처음 데이터 불러오기
    eventBus.$on('onClickAddButton', () => {
      this.currentView = 'AddContact';  // AddContact는 컴포넌트 이름
    });
    eventBus.$on('onClickUpdateButton', (no) => {
      this.fetchContactOne(no);
      this.currentView = 'UpdateContact';
    });
    eventBus.$on('onClickDeleteButton', (no) => {
      this.deleteContact(no);
    });
    eventBus.$on('cancel', () => {
      this.currentView = null;
    });
    eventBus.$on('onClickPhoto', (no) => {
      this.fetchContactOne(no);
      this.currentView = 'UpdatePhoto';
    });
    eventBus.$on('onPhotoUpdate', (no, file) => {
      this.updatePhoto(no, file);
    });
    eventBus.$on('onCancel', () => {
      this.currentView = null;
    });
    eventBus.$on('onAddContact', (contact) => {
      this.addContact(contact);
      this.fetchContacts();
    });
    eventBus.$on('onUpdateContact', (contact) => {
      this.updateContact(contact);
    });
  },
  computed: {
    totalpage() {
      return Math.floor((this.contactlist.totalcount-1) / this.contactlist.PAGESIZE) + 1;
    }
  },
  methods: {
    pageChanged(page) {
      this.contactlist.pageno = page;
      this.fetchContacts();
    },
    fetchContacts() {
      this.$axios.get(CONF.FETCH, {params: {
        pageno: this.contactlist.pageno,
        pagesize: this.contactlist.pagesize
      }})
      .then(res => {
        this.contactlist = res.data;
      })
      .catch(e => {
        console.log('fetchContacts Error', e);
        this.contactlist.contacts = [];
      })
    },
    fetchContactOne(no) {
      this.$axios.get(CONF.FETCH_ONE.replace('${no}', no))
      .then(res => {
        this.contact = res.data;
      })
      .catch(e => {
        console.log('fetchContactOne Error', e);
      })
    },
    addContact(contact) {
      this.$axios.post(CONF.ADD, contact) // 왜 this.contact가 아니고 contact인가?
      .then(res => {
        this.contact = res.data;
        this.contactlist.pageno = 1;  // pageno를 watch 해야 하는가?
      })
      .catch(e => {
        console.log('addContact Error', e);
      })
    },
    updateContact(no, contact) {
      this.$axios.put(CONF.UPDATE.replace('${no}', no), contact)
      .then(() => {
        this.fetchContacts();  // 코드 중복 제거
      })
      .catch(e => {
        console.log('updateContact Error', e);
      })
    },
    deleteContact(no) {
      this.$axios.delete(CONF.DELETE.replace('${no}', no))
      .then(() => {
        this.fetchContacts();  // 코드 중복 제거
      })
      .catch(e => {
        console.log('deleteContact Error', e);
      })
    },
    updatePhoto(no, file) {
      var data = new FormData();
      data.append('photo', file);
      this.$axios.post(CONF.UPDATE_PHOTO.replace('${no}', no), data)
      .then(() => {
        this.fetchContacts();
      })
      .catch(e => {
        console.log('updatePhoto Error', e);
      })
    }
  }
}
</script>

<style scoped>
@import url("https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css");
#container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>