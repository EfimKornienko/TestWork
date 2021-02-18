const request1 = fetch('http://jsonplaceholder.typicode.com/posts').then((r) =>
  r.json(),
)
const request2 = fetch(
  'http://jsonplaceholder.typicode.com/comments',
).then((r) => r.json())

const request3 = fetch('https://jsonplaceholder.typicode.com/users').then((r) =>
  r.json(),
)

let getPosts = []
let getComments = []
let getUsers = []

Promise.all([request1, request2, request3]).then((data) => {
  data[0].forEach((e) => {
    getPosts.push(e)
  })
  data[1].forEach((e) => {
    getComments.push(e)
  })
  data[2].forEach((e) => {
    getUsers.push(e)
  })
})
export { getPosts, getComments, getUsers }
