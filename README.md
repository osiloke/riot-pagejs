Riot Page

Lightweight router for riotjs using page.js

Simple usage

```
router.route({
  name: 'login',
  path: '/login',
  container: '#main',
  tag: 'login-view',
  tpl: 'app/views/auth/components/login.tag'
})
router.route({
  name: 'logout',
  path: '/logout',
  error: (ctx, next, err) =>{
    console.log(err)
  },
  enter: (ctx) =>{
    console.log("logging out")
    AuthStore.logout()
    .then((resp) => {
      router.redirect('/')
    })
    .catch((err) => {
      console.log(err)
      router.back()
    })
  }
})
```
