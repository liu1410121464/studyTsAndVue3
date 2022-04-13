import { ref } from 'vue'
import axios from 'axios'

function userURLLoader<T> (url:string) {
  const result = ref<T | null>(null)
  const loading = ref(true)
  const loaded = ref(false)
  const error = ref(null)

  axios.get(url).then((rawData)=>{
    loaded.value = true
    loading.value = false
    result.value = rawData.data
  }).catch((error)=>{
    error.value = error
  })
  
  return {
    result,
    loaded,
    loading,
    error
  }
}

export default userURLLoader