<template>
    <div id="app">
        <h1 @click="getdata(username = '')">
            <strong>{{ title }}</strong>
            <em>{{ subTitle }}</em>
        </h1>
        <div style="text-align: center;">
            <input id="searchbox" type="text" @keyup.enter="getdata(username)" v-model="username" placeholder=""
                autofocus=true />
            <br />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from "axios"

export default defineComponent({
    name: 'GitHubSearch',
    data() {
        return {
            title: 'GitHub',
            subTitle: ' Search',
            username: '',
            on: false,
            fade: false,
            users: [],
            rawLabel: 'Show',
            rawBool: false,
            rate_limit: {},
            clientID: "fake",
            clientSecret: "fake"
        }
    },
    methods: {
        getdata(id: string) {
            axios.get('https://api.github.com/users/' + id + "?client_id=" + this.clientID + "&client_secret=" + this.clientSecret)
                .then((response) => {
                    let routeData = this.$router.resolve({ name: 'user', params: { username: id } });
                    window.open(routeData.href, '_self');
                })
                .catch(() => {
                    this.$toast.open({
                        message: "Usuário não encontrado",
                        type: "error",
                        position: 'top-right',
                        duration: 10000,
                        dismissible: true,
                    })
                })
        }
    }
});
</script>