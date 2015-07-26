Riot Page

Lightweight router for riotjs using page.js

Simple usage

```
import router from 'riot-page/lib/route';
import AuthStore from 'riot-auth/lib/store';

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
