# Moebooru API
A API wrapper that reads the HTML of the site and extracts info

This library supports fetching:
- Manga, 
- List of Manga, 
- tags/characters/parodies/catagories/groups/artists

# Install
``` npm install --save api2-moebooru ```

# API
```
const MoebooruAPI = require('api2-moebooru') 
const api = new MoebooruAPI();
api.post.id(297045).then((post)=> console.log(JSON.stringify(post, null, 2)));
```
