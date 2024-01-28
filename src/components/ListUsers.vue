<script setup>
import axiosIns from "../core/axios.js"
import {ref} from "vue"
import {useRoute, useRouter} from "vue-router"

const users = ref([])
const query = ref("")
const router = useRouter()
const githubUserEndpoint = "https://api.github.com/users"
const usersToFind = ["wallysonn", "diego3g", "filipedeschamps", "rmanguinho"]
let doSearch = null

const formatDate = date => {
    const dateObj = new Date(date)
    return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`
}

const fetchDefaultUsers = () => {
    for (const user of usersToFind) {
        axiosIns
            .get(`${githubUserEndpoint}/${user}`)
            .then(response => {
                users.value.push(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

const lookupUsers = () => {
    clearTimeout(doSearch)
    doSearch = setTimeout(() => {
        if (query.value === "") {
            users.value = []
            fetchDefaultUsers()
            return
        }
        const user = users.value.filter(user => user.name.toLowerCase().includes(query.value.toLowerCase()))
        if (user.length !== 0) {
            users.value = user
        }
        clearInterval()
    }, 1000)
}

const openDetails = login => {
    router.push({name: "user", params: {login}})
}

fetchDefaultUsers()
</script>

<template>
    <div class="row">
        <div class="col-12 text-center">
            <h2>GitHub Users</h2>
        </div>
    </div>
    <div class="row mt-4">
        <div class="col-12 text-center">
            <input type="text" v-model="query" class="form-control" placeholder="Pesquisar usuário" @keyup="lookupUsers" />
        </div>
    </div>
    <div class="row mt-4">
        <div class="col-4 mb-4" v-for="user in users" :key="user.id" @click="openDetails(user.login)" style="cursor: pointer">
            <div class="card">
                <div class="row">
                    <div class="col-2 align-self-center">
                        <img :src="user.avatar_url" class="img-fluid ms-3" alt="..." />
                    </div>
                    <div class="col-8">
                        <div class="card-body">
                            <h5 class="card-title">{{ user.name }}</h5>
                            <small>Usuário desde {{ formatDate(user.created_at) }}</small>
                        </div>
                    </div>
                    <div class="col-2 align-self-center">
                        <strong>{{ user.public_repos }}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
img {
    border-radius: 50%;
}
</style>
