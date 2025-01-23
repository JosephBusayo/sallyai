const { default: axios} = require('axios').

YOUTUBE_BASE_URL ="https://www.googleapis.com/youtube/v3/search"


const getVideos = async(query)=>{
    const params={
        part:'snipper',
        q:query,
        maxResults:1,
        key : process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    }

    const resp=await axios.get(YOUTUBE_BASE_URL, {params})

    return resp.data.items
}

export default{getVideos}
