<template>
  <div id="app">
    <div class="usercard mui--z5">
      <div class="row_first">
        <a :href="user.html_url" target="_blank">
          <img :src="user.avatar_url" :alt="user.name" :title="user.id" />
        </a>
        <div class="top">
          <div class="name">
            <a class="cursor">
              <h2>{{ user.login || 'Unknown' }}</h2>
            </a>
            <p>@{{ user.login }} <small>/{{ user.type }} #{{ user.id }}</small></p>
          </div>
          <div class="widget">
            <a class="cursor">
              <p class="title">Public Repositories</p>
              <span class="count">{{ user.public_repos }}</span>
            </a>
          </div>
          <div class="widget">
            <a class="cursor">
              <p class="title">Public<br />Gists</p>
              <span class="count">{{ user.public_gists }}</span>
            </a>
          </div>
          <div class="widget">
            <p class="title">Total Follower</p>
            <span class="count">{{ user.followers }}</span>
          </div>
          <div class="widget">
            <p class="title">Total Following</p>
            <span class="count">{{ user.following }}</span>
          </div>
        </div>
      </div>
      <div class="row_third">
        <div class="name" v-if="current_view === 'user_view'">
          <p v-if="user.email"><strong>E-Mail</strong> {{ user.email }}</p>
          <p v-if="user.company"><strong>Company</strong> {{ user.company }}</p>
          <p v-if="user.blog"><strong>Blog</strong> {{ user.blog }}</p>
          <p v-if="user.location"><strong>Location</strong> {{ user.location }}</p>
          <p v-if="user.bio"><strong>Biodata</strong> {{ user.bio }}</p>
          <p><strong>Member since</strong> {{ user.created_at }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from "axios"
import type { User } from '@/models/user'

export default defineComponent({
  name: "GitHubUser",
  data() {
    this.getdata();
    return {
      user: {} as Partial<User>,
      current_view: "user_view",
      isActive: false,
      repos_filter: '',
      last_call: {
        repos: {},
        followers: {},
        following: {},
      },
      cache: {
        repos: {},
        repos_more: {},
        repos_index: 0,
        repos_id: 0,
        repos_page: 1,
        repos_more_view: false,
        followers: {},
        following: {},
      }
    };
  },
  methods: {
    getdata() {
      let username = this.$route.params.username;
      axios.get("https://api.github.com/users/" + username)
        .then((response) => {
          this.user = response.data as User;
          console.log(this.user);
        });
    }
  }
})
</script>

<style lang="scss">
.usercard {
  margin: 0 auto;
  padding: 20px;
  display: inline-flex;
  flex-direction: column;
  width: 600px;
  background-color: #fff;
  border-radius: 2px;
  color: #333;

  &:hover {
    transform: scale3d(1.02, 1.02, 1.02);
    transition: all 0.2s ease-in-out;
  }
}

.row_first {
  display: flex;

  img {
    height: 70px;
    width: 70px;
    border-radius: 50%;
  }

  .top {
    display: flex;
    height: 70px;
    width: 530px;
    margin: 0 0 20px 20px;
    border-bottom: 1px solid #999;

    .name {
      margin: auto 0;
      padding: 0;
      margin-right: auto;

      h2 {
        font-size: 20px;
      }

      small {
        text-transform: uppercase;
        font-size: 8px;
      }
    }

    .widget {
      margin: auto 2px;
      padding: 0;
      width: 55px;
      align-self: right;
      text-align: center;

      p {
        text-transform: uppercase;
        font-size: 8px;
        margin: 0;
      }

      span {
        font-size: 22px;
        font-weight: bold;
      }
    }
  }
}

.row_first .top .name h2,
.row_first .top .name p {
  display: block;
  margin: 0;
  text-align: left;
  max-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row_third {
  display: flex;
  margin-left: 90px;
  padding-bottom: 20px;

  .name {
    margin: auto 0;
    padding: 0;
    margin-right: auto;

    p {
      display: block;
      margin: 0;
      text-align: left;
    }
  }

  .repos {
    text-align: left;
    display: flex;
    width: 100%;

    input {
      margin-bottom: 10px;
      padding: 0 10px;
      width: 200px;
    }

    .repos_list {
      ul {
        padding-left: 20px;

        li {
          list-style: square;
        }
      }
    }

    .repos_more {
      margin-left: auto;
      padding: 0 10px 20px 0;
      border: 1px #333 solid;
      align-self: flex-start;
      max-width: 50%;

      h4 {
        padding: 20px 20px 0 20px;
        margin: 0;
      }

      ul {
        padding-left: 20px;

        li {
          list-style: none;
          overflow: hidden;
        }
      }
    }
  }
}

.cursor {
  cursor: pointer;

  &:hover {
    color: #1976d2;
    text-decoration: none;
  }
}

.active {
  color: #1976d2;
  font-weight: bold;
}

.mui-btn {
  &.light {
    color: #fff;
    background-color: #bbdefb;
  }
}
</style>