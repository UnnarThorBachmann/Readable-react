import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route,Link,withRouter} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import {setCategories,setPosts,emptyFalse,addComment} from './actions';
import Tab from './components/tab.js';
import Posts from './components/posts.js';
import PostDetailed from './components/postdetailed.js';
import Edit from './components/edit.js';
import New from './components/new.js';

import Button from './components/button.js';
import {timeComparator,votesComparator,commentsComparator,isEmpty} from './helpers';

class App extends Component {
  
  constructor(props) {
    super(props);
   
    
  }

  componentDidMount() {
    const {empty,dispatch} = this.props;
    if (empty) {
      
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
        
       dispatch(emptyFalse());
  		}
    
  }

  render() {
    let {posts,categories,sorts} = this.props;
    
    if (isEmpty(posts))
		  posts = [];
    else
      posts = posts.posts;
      posts[Symbol.iterator] = function*() {
        for (let key in this) {
              yield this[key] 
          }
      }

    if (isEmpty(categories)) 
    	categories = [];
     else
      categories = categories.categories

    let sortFunc;
    if (sorts.sort === 'time') 
      sortFunc = timeComparator;
    else if (sorts.sort === 'comments')
      sortFunc = commentsComparator;
    else
      sortFunc = votesComparator;

    

    posts = Array.from(posts);
    return (
  
      <div className="body">
      	<div className="header">
       		<h1>Readable Project</h1>
      	</div>
      	<div className="main">
           {
            categories.map((category)=>
              <Route key={category.name} exact path={`/${category.path}`}>
                <div>

                <Tab categories={categories}/>
                </div>
              </Route>)
           }
           
           {
            categories.map((category)=>
              <Route key={"posts" + category.name} exact path={`/${category.path}`}>
                <Posts posts={posts.sort(sortFunc)} filter={category.name} header={category.name}/>
              </Route>)
           }
           
           {
            posts.map((post)=> <Route key={post.id} exact path={`/${post.category}/${post.id}`}>
                <PostDetailed post={post}/>
              </Route>)
           }
           {
            posts.map((post)=> <Route key={post.id} exact path={`/edit/${post.id}`}>
                <Edit post={post}/>
              </Route>)
           }
           {categories.map((category)=><Route key={`${category.name}`} exact path={`/${category.path}`} render={()=> <Button/>}/>)
           }

           <Route key={"new"} exact path="/new">
                <New post={{title: '',author: '', body: '', category: 'udacity'}}/>
            </Route>


			     
          
     	</div>
	 </div>
     
    );
    
  }
}
function mapStateToProps(state) {
  return {
  	...state
  }
};
export default withRouter(connect(mapStateToProps)(App));
