import riot from 'riot';
import Promise from 'es6-promise';

let _mounts = {};
let _views = {};

let mountView = function(location, tag, tag_file, opts){
	return new Promise.Promise((resolve, reject) =>{
		if (!_views[tag_file]){
			System.import(tag_file)
			.then((mod) =>{
				_views[tag_file] = mod
					console.log('mounting '+tag)
				_mounts[tag] = riot.mount(location, tag, opts)
				resolve({module: mod, tags: _mounts[tag]})
			})
			.catch((e) =>{
				reject(e)
			})
		}else{
			if(_mounts[tag]){
				console.log(tag+' already mounted')
				_mounts[tag][0].update({opts: opts})
			}else{
				console.log('mounting '+tag)
				_mounts[tag] = riot.mount(location, tag, opts)
			}
			resolve({module: _views[tag_file], tags: _mounts[tag]})
		}
	})
}

let unmountView = function(tag){
	let tags = _mounts[tag]
	if (tags){
		tags.forEach((t) =>{
			t.unmount(true)
		})
		delete _mounts[tag]
	}
}

export default {
	mount: mountView,
	unmount: unmountView
}
