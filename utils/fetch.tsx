import { env_get } from 'utils/vars'
const fetch_server_side = async ( req ) => {
  const { query, resolvedUrl, params } = req
  const params_parsed = params ? JSON.parse(JSON.stringify(params))[""] : [];
  const query_parsed = JSON.parse(JSON.stringify(query));
  const url_parsed = JSON.parse(JSON.stringify(resolvedUrl));
  const url_to_fetch = `http://localhost:8080${url_parsed}`
  let res = null
  let payload = {}
  try {
    console.log(`*** fetching ${url_to_fetch}`);
    res = await fetch(url_to_fetch);
    payload = await res.json()
  } catch(e) {
    payload = {
      error_page: true
    }
  }
  return {
    props: {
      content: payload,
      request: {
        params: params_parsed,
        query: query_parsed, 
        url: url_parsed
      }
    }
  }
}

export { fetch_server_side };