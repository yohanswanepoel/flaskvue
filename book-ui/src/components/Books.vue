<template>
  <div class="container">
  <div class="row">
    <div class="col-sm-10">
      <h1>Books</h1>
      <hr><br><br>
      <alert :message=message :type=messageType v-if="showMessage"></alert>
      <button type="button" class="btn btn-success btn-sm" v-b-modal.bookmodal>Add Book</button>
      <br><br>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Read?</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(book,index) in books" :key="index">
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>
              <span v-if="book.read">Yes</span>
              <span v-else>No</span>
            </td>
            <td>
              <button type="button" class="btn btn-warning btn-sm">Update</button>
              <button type="button" class="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <b-modal ref="addBookModal" id="bookmodal" title="Add a new book" hide-footer>
    <b-form @submit="onSubmit" @reset="onReset" class="w-100">
      <b-form-group id="form-title-group" label="Title:" label-for="form-title-input">
        <b-form-input id="form-title-input" type="text" v-model="addBookForm.title"
              required placeholder="Enter title">
        </b-form-input>
      </b-form-group>
      <b-form-group id="form-author-group" label="Author:" label-for="form-author-input">
        <b-form-input id="form-author-input" type="text" v-model="addBookForm.author"
              required placeholder="Enter author">
        </b-form-input>
      </b-form-group>
      <b-form-group id="form-read-group">
        <b-form-checkbox-group v-model="addBookForm.read" id="form-checks">
          <b-form-checkbox value="true">Read?</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <b-button type="submit" variant="primary" class="btn btn-primary btn-sm">Submit</b-button>
      <b-button type="reset" variant="danger" class="btn btn-danger btn-sm">Reset</b-button>
    </b-form>
  </b-modal>
</div>
</template>

<script>
import axios from 'axios';
// import Vue from 'vue';
import Alert from './Alert';

// Vue.component('alert', Alert);

export default {
  name: 'Books',
  data() {
    return {
      books: [],
      addBookForm: {
        title: '',
        author: '',
        read: [],
      },
      message: '',
      showMessage: false,
      messageType: 'success',
    };
  },
  methods: {
    getBooks() {
      axios.get(`${window.API_URL}/books`)
        .then((res) => {
          this.books = res.data.books;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addBook(payload) {
      axios.post(`${window.API_URL}/books`, payload)
        .then(() => {
          this.getBooks();
          this.message = 'Books Added';
          this.showMessage = true;
          this.messageType = 'success';
        })
        .catch((error) => {
          console.log(error);
          this.getBooks();
          this.message = 'Error';
          this.messageType = 'danger';
          this.showMessage = true;
        });
    },
    initForm() {
      this.addBookForm.title = '';
      this.addBookForm.author = '';
      this.addBookForm.read = [];
      this.message = false;
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addBookModal.hide();
      let read = false;
      if (this.addBookForm.read[0]) read = true;
      const payload = {
        title: this.addBookForm.title,
        author: this.addBookForm.author,
        read,
      };
      this.addBook(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addBookModal.hide();
      this.initForm();
    },
  },
  created() {
    this.getBooks();
  },
  components: {
    alert: Alert,
  },
};

</script>
