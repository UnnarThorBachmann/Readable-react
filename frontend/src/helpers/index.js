// The classic Knut shuffle http://algs4.cs.princeton.edu/11model/Knuth.java.html
/*
public static void shuffle(Object[] a) {
        int n = a.length;
        for (int i = 0; i < n; i++) {
            // choose index uniformly in [0, i]
            int r = (int) (Math.random() * (i + 1));
            Object swap = a[r];
            a[r] = a[i];
            a[i] = swap;
        }
    }
*/
function shuffle(array) {
	let n = array.length;
	for (var i = 0; i < n; i++) {
		let r = parseInt(Math.random()*(i+1))
		let swap = array[r];
		array[r] = array[i];
		array[i] = swap;
	}
}
export function randomString() {
	
	const letters = ['0','1','2','3','4',
        '5','6','7','8','9','10','a','b','c','d','e','f','g','h','i',
        'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    shuffle(letters);
    const id = letters.slice(20).join('');

    return id;
}

export function timeComparator(a,b) {
    return b.timestamp-a.timestamp;
}

export function votesComparator(a,b) {
    return b.voteScore-a.voteScore;
}

export function commentsComparator(a,b) {
    return b.comments-a.comments;
}
// From https://stackoverflow.com/questions/42813784/javascript-check-if-object-is-empty
export function isEmpty(obj) {
    if (Object.keys(obj).length === 0 && obj.constructor === Object) 
        return true;
    else
        return false;
}

export function deletePostOnServer(id) {
  let url= "http://localhost:3001/posts/" + id.toString();
 
    fetch(url,{ headers: { 'Authorization': 'whatever-you-want', method: 'DELETE'}})
      .then( (res) => { return(res.text()) })
      .then((data) => {
        console.log(data);
      });
}

export function fetchFromServer (dispatch,setCategories,setPosts,addComment) {
    let url= "http://localhost:3001/categories";
    fetch(url,{ headers: { 'Authorization': 'whatever-you-want' }})
      .then( (res) => { return(res.text()) })
      .then((data) => {
        const temp = JSON.parse(data).categories;
        temp.push({path: '', name:'all'})
        dispatch(setCategories(temp));
      });
    

      url = "http://localhost:3001/posts";

      fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})
          .then( (res) => { return(res.text()) })
          .then((data) => {
              const posts_array = JSON.parse(data);
              let objects = {};
              for (let post of posts_array) {
                post.comments = {};
                objects[post.id] = post;
              } 
                
              dispatch(setPosts(objects));

              for (let post of posts_array) {
                fetch(url + `/${post.id}/comments`, { headers: { 'Authorization': 'whatever-you-want' }})
                  .then( (res) => { return(res.text()) })
                  .then((data) => {
                    const comments_array = JSON.parse(data);
                    for (let comment of comments_array) {
                      dispatch(addComment(comment));
                    }
                  });
              }
              

              
        });
        
}