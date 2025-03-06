import { ref } from "vue";
import algoliasearch from 'algoliasearch/lite';



const getSearchKey= async(uid)=>{
    const searchClient = ref(null);
    const searchKey = ref(null);
    const options={
        method: "POST",
        body: JSON.stringify({
            uid: uid
        }),
        headers:{
            "Content-Type": "application/json"
        }
      }
    const response= await fetch('https://expressapi-yc7ocl2pnq-uc.a.run.app/search', options)
    const data= await response.json()
    searchKey.value= data;
    searchClient.value = algoliasearch(
        'GHBZ5JGWJD',
        data.key
    )
    
    return {searchClient}
}
export default getSearchKey
