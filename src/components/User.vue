<script setup>
import axiosIns from "../core/axios.js"
import {ref} from "vue"
import {useRoute} from "vue-router"

const repos = ref([])
const owner = ref({})
const errorMessage = ref("")
const hasError = ref(false)
const showSuccessMessage = ref(false)
const successMessage = ref("")
const gitHubUserEndpoint = "https://api.github.com/users"
const loginGitHub = useRoute().params.login

const formatDate = date => {
    const dateObj = new Date(date)
    return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`
}

const fetchRepositories = () => {
    axiosIns
        .get(`${gitHubUserEndpoint}/${loginGitHub}/repos`)
        .then(response => {
            repos.value = response.data
            owner.value = response.data[0].owner
        })
        .catch(error => {
            console.log(error)
        })
}

const saveDataJsonFile = () => {
    hasError.value = false
    showSuccessMessage.value = false
    successMessage.value = ""
    errorMessage.value = ""
    axiosIns
        .post("http://127.0.0.1:8000/api/inklo/github/user", {
            username: loginGitHub,
        })
        .then(res => {
            showSuccessMessage.value = true
            successMessage.value = res.data.message
        })
        .catch(error => {
            hasError.value = true
            if (error.response?.status === 422) {
                errorMessage.value = error.response.data.message
                return
            }

            errorMessage.value = "Erro ao salvar os dados"
        })
}

fetchRepositories()
</script>

<template>
    <div class="row" v-if="repos.length > 0">
        <div class="col-3 text-center">
            <img :src="owner.avatar_url" class="img-fluid ms-3" />
            <h3 class="mt-3">{{ owner.login }}</h3>
            <br />
            <button class="btn btn-primary" @click="saveDataJsonFile">Salvar Dados em Json</button>
            <br /><br />
            <button class="btn btn-primary" @click="fetchRepositories">Atualizar Repositórios</button>
        </div>
        <div class="col-9">
            <div class="row">
                <div class="col-12">
                    <h2>Repositórios</h2>
                    <div class="alert alert-danger" role="alert" v-if="hasError">{{ errorMessage }}</div>
                    <div class="alert alert-success" role="alert" v-if="showSuccessMessage">{{ successMessage }}</div>
                </div>
            </div>
            <div class="card mb-4" v-for="repo in repos" :key="repo.id">
                <div class="row">
                    <div class="col-12">
                        <div class="card-body">
                            <h5 class="card-title">
                                <a :href="repo.html_url" target="_blank">{{ repo.name }}</a>
                            </h5>
                            <small>Tecnologia: {{ repo.language }}</small
                            ><br />
                            <small>Atualizado em {{ formatDate(repo.updated_at) }} </small>
                        </div>
                    </div>
                    <div class="col-2 align-self-center">
                        <strong></strong>
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
