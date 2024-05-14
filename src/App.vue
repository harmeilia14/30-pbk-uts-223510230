<template>
  <header>
      <button @click="showPosts">Posts</button>
      <button @click="showTodos">Todos</button>
    </header>
    <div v-if="view === 'posts'">
      <div class="post-app">
        <h1> DATA USER </h1> <br>
        <p1> Select Option :</p1>
        <select v-model="selectedUser" @change="fetchPosts">
          <option value="" selected disabled>Pilih User</option>
          <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
        </select>
      
        <div v-if="posts.length > 0">
          <ul>
            <li v-for="post in posts" :key="post.id">
              <h3>{{ post.title }}</h3>
              <p>{{ post.body }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  
</template>

<script>
export default {
  data() {
    return {
      currentSection: 'post',
      users: [],
      posts: [],
      selectedUserId: '',
      newActivity: {
        name: '',
        dateTime: ''
      },
      activities: [],
      filter: ''
    };
  },
  methods: {
    showPostSection() {
      this.currentSection = 'post';
      this.fetchUsers();
    },
    showTodosSection() {
      this.currentSection = 'todos';
    },
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(users => {
          this.users = users;
        })
        .catch(error => console.error('Error fetching users:', error));
    },
    fetchPosts(userId) {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(posts => {
          this.posts = posts;
        })
        .catch(error => console.error('Error fetching posts:', error));
    },
  }
</script>

<style lang="stylus">
  @import "./assets/stylus/main.styl";
</style>
