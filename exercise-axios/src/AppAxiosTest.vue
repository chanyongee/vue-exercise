<template>
    <div id="app">
        <div class="container">
            <div class="form-group">
                <button @click="fetchContacts">1페이지 연락처 조회</button>
            </div>
            <div class="form-group">
                <input type="text" v-model="name" placeholder="이름 입력">
                <input type="text" v-model="tel" placeholder="전화번호 입력">
                <input type="text" v-model="address" placeholder="주소 입력">
                <button @click="addContact">연락처 1건 추가</button>
            </div>
            <div class="form-group">
                <input type="text" v-model="no">
                <button @click="fetchContactOne">연락처 1건 조회</button>
            </div>
            <div class="form-group">
                <input type="text" v-model="no">
                <input type="text" v-model="name" placeholder="이름 입력">
                <input type="text" v-model="tel" placeholder="전화번호 입력">
                <input type="text" v-model="address" placeholder="주소 입력">
                <button @click="updateContact">수정</button>
            </div>
            <div class="form-group">
                <input type="text" v-model="no">
                <button @click="deleteContact">삭제</button>
            </div>
            <div class="form-group">
                <input type="text" v-model="no">
                <input type="file" ref="photofile" name="photo"> <!-- ref를 통해 자바스크립트에서 직접 접근할 수 있음. 되도록 피하는 것이 좋음 -->
                <button @click="changePhoto">사진 변경</button>
            </div>
        </div>
        <span>JSON 출력</span>
        <div id="result" class="container">
            <xmp>{{result}}</xmp>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            no: 0,
            name: '',
            tel: '',
            address: '',
            result: null
        }
    }    ,
    methods: {
        fetchContacts() {
            axios({
                method: 'GET',
                url: '/api/contacts',
                params: {pageno: 1, pagesize: 5}
            })
            .then(response => {
                console.log(response);
                this.result = response.data;
            })
            .catch(ex => {
                console.log("ERROR: ", ex);
            })
        },
        addContact() {
            axios.post('/api/contacts',
            {name: this.name, tel: this.tel, address: this.address})
            .then(res => {
                console.log(res);
                this.result = res.data;
                this.no = res.data.no;
            })
            .catch(e => {
                console.log("ERROR: ", e);
            })
        },
        fetchContactOne() {
            axios.get('/api/contacts/' + this.no)
            .then(response => {
                console.log(response);
                this.result = response.data;
            })
        },
        updateContact() {
            axios.put('/api/contacts/' + this.no, 
            {name: this.name, tel: this.tel, address: this.address})
            .then(res => {
                console.log(res);
                this.result = res.data;
                this.name = '';
                this.tel = '';
                this.address = ''; // 초기화
            })
            .catch(e => { console.log('ERROR: ', e)});
        },
        deleteContact() {
            axios.delete('/api/contacts/' + this.no)
            .then(res => {
                console.log(res);
                this.no = 0;
                this.result = res.data;
            })
            .catch(e => { console.log('ERROR: ', e)});
        },
        changePhoto() {
            var data = new FormData();
            var file = this.$refs.photofile.files[0]; // DOM 객체를 refs로 직접 접근
            data.append('photo', file);

            axios.post('/api/contacts/' + this.no + '/photo', data)
            .then(res => {
                this.result = res.data;
            })
            .catch(e => { console.log('ERROR: ', e)});
        }
    }
}
</script>

<style scoped>
@import url("https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css");
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container { border:solid 1px gray; padding:10px; margin-bottom:10px; text-align:left; }
#result { text-align: left ; padding:20px; border:solid 1px black; }
.form-group { border:dashed 1px gray; padding:5px 5px 5px 20px; }
</style>