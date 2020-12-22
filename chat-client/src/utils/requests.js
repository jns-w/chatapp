import axios from 'axios'

async function get(url, data) {
  try {
    const res = await axios.get(url, data)
    if (res.status === 200) {
      return res.data
    }
  } catch (err) {
    return null
  }
}

async function post(url, data) {
  try {
    const res = await axios.post(url, data);
    if (res.status === 200) {
      if (res.data) {
        return res.data
      } else {
        return res.status
      }
    }
  } catch (err) {
    return null
  }
}

async function put(url, data) {
  try {
    const res = await axios.put(url, data);
    if (res.status === 200) {
      if (res.data) {
        return res.data
      } else {
        return res.status
      }
    }
  } catch (err) {
    return null
  }
}

export {get, post, put}