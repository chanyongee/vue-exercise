<template>
    <div class="modal">
        <div class="form" @keyup.esc="onCancel">
            <h3 class="heading">:: {{headingText}}</h3>
            <div v-if="mode == 'update'" class="form-group">
                <label for="">일련번호</label>
                <input type="text" name="no" class="long" disabled v-model="contact.no">
            </div>
            <div class="form-group">
                <label for="">이름</label>
                <input type="text" name="name" class="long" :value="contact.name" @input="onInput($event)" ref="name" placeholder="이름을 입력하세요">
            </div>
            <div class="form-group">
                <label for="">전화번호</label>
                <input type="text" name="tel" class="long" :value="contact.tel" @input="onInput($event)" placeholder="전화번호를 입력하세요">
            </div>
            <div class="form-group">
                <label for="">주소</label>
                <input type="text" name="address" class="long" :value="contact.address" @input="onInput($event)" placeholder="주소를 입력하세요">
            </div>
            <div class="form-group">
                <div>&nbsp;</div>
                <input type="button" class="btn btn-primary" :value="btnText" @click="onClickSubmit()">
                <input type="button" class="btn btn-primary" value="취소" @click="onCancel()">
            </div>
        </div>

    </div>
</template>

<script>
import eventBus from '../Eventbus.js';
export default {
    props: {
        mode : { type: String, default: 'add' },
        contact: {
            type: Object,
            default() {
                return { no: '', name: '', address: '', photo: '' }
            }
        }
    },
    computed: {
        headingText() {
            if (this.mode == 'add') return '새로운 연락처 추가';
            else return '수정';
        },
        btnText() {
            if (this.mode == 'add') return '추가';
            else return '수정';
        }
    },
    methods: {
        onInput(e) {
            this.contact[e.target.name] = e.target.value;
        },
        onCancel() {
            eventBus.$emit('onCancel');
        },
        onClickSubmit() {
            if (this.mode == 'add') eventBus.$emit('onAddContact', this.contact);
            else eventBus.$emit('onUpdateContact', this.contact);
        }
    }
}
</script>


<style scoped>
.modal { display: block; position: fixed; z-index: 1; 
    left: 0; top: 0; width: 100%; height: 100%;
    overflow: auto; background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4); }
.form { background-color: white; margin:100px auto;
    max-width: 400px; min-width: 200px; font: 13px "verdana";
    padding: 10px 10px 10px 10px;  }
.form div { padding: 0;  display: block;  margin: 10px 0 0 0; }
.form label{ text-align: left; margin:0 0 3px 0;  padding:0px;
    display:block; font-weight: bold; }
.form input, textarea, select { box-sizing: border-box;
    border:1px solid #BEBEBE; padding: 7px; margin:0px;
    outline: none;  }
.form .long { width: 100%; }
.form .button{ background: #2B798D; padding: 8px 15px 8px 15px;
    border: none; color: #fff; }
.form .button:hover { background: #4691A4; }
.form .heading { background: #33A17F; font-weight: 300;
    text-align: left; padding : 20px; color: #fff;
    margin:5px 0 30px 0; padding: 10px; min-width:200px;
    max-width:400px; }
</style>