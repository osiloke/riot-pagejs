import page from 'page'
import Promise from 'es6-promise';
import view from './view';

class Router {
  constructor() {
    this.routes = {}
    this.prev = null
    this.cur = null
    this.beforeRequest = null

    page.exit('*', (ctx, next) => {
      console.log('Exit '+ctx.cur)
      ctx.prev = ctx.cur
      this.prev = this.cur
      next()
    })
  }
  redirect(location){
    page.redirect(location)
  }
  go(location){
    page(location)
  }
  back(){
    page.back()
  }
  setBeforeRequest(br){
    this.beforeRequest = br
  }

  /*
  Try to get options passed to riot mount
  */
  _get_opts(opts, ctx){
    return new Promise.Promise((resolve, reject) =>{
      if (opts){
        opts(ctx)
        .then((options) => {
          resolve(options)
        })
        .catch((err)=> {
          resolve(null)
        })
      }else{
        resolve(null)
      }
    })
  }
  route(opts){
    page(opts.path, (ctx, next) => {
      ctx.cur = opts.name
      console.log('Enter '+ctx.cur)
      this.cur = opts

      if (this.prev && this.cur){
        if (this.prev.name !== this.cur.name){
          if (this.prev.tag){
            console.log('unmounting '+ this.prev.tag)
            view.unmount(this.prev.tag)
          }
        }
      }
      const canMount = opts.container? (opts.tag? (opts.tpl? true: false): false): false
      this._get_opts(opts.opts, ctx)
      .then((options) =>{
        new Promise.Promise((resolve, reject) =>{
          if (canMount){
            view.mount(opts.container, opts.tag, opts.tpl, options)
            .then((mnt) => {
              resolve(mnt)
            })
            .catch((err) =>{
              reject(err)
            })
          }else{
            resolve(null)
          }
        })
        .then((mnt) =>{
          const tag = mnt? mnt.tags[0]:null
          if (opts.enter) {
            try{
              opts.enter(ctx, next, tag)
            }catch(err){
              if (opts.error)
                opts.error(ctx, next, err)
            }
          }
        })
        .catch((err) =>{
          if (opts.error)
            opts.error(ctx, next, err)
        })
      })
    })
    this.routes[opts.name] = opts
  }
}

export default new Router()
