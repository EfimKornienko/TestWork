const request1 = fetch('http://jsonplaceholder.typicode.com/posts').then((r) =>
  r.json()
)
const request2 = fetch(
  'http://jsonplaceholder.typicode.com/comments'
).then((r) => r.json())

const request3 = fetch('https://jsonplaceholder.typicode.com/users').then((r) =>
  r.json()
)
let getPosts = []
let getComments = []
let getUsers = []

Promise.all([request1, request2, request3]).then((data) => {
  data[0].forEach((element) => {
    getPosts.push(element)
  })
  data[1].forEach((element) => {
    getComments.push(element)
  })
  data[2].forEach((element) => {
    getUsers.push(element)
  })
})
export { getPosts, getComments, getUsers }
