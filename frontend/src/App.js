import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route,Link,withRouter,Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import {setCategories,setPosts,emptyFalse,addComment} from './actions';
import SortBy from './components/tab.js';
import Posts from './components/posts.js';
import PostDetailed from './components/postdetailed.js';
import Edit from './components/edit.js';
import New from './components/new.js';
import Error from './components/error.js';
import Tab from './components/tab.js';


import Button from './components/button.js';
import {timeComparator,votesComparator,commentsComparator,isEmpty,fetchFromServer} from './helpers';

class App extends Component {
  
  constructor(props) {
    super(props);
   
    
  }

  componentDidMount() {
    const {empty,dispatch} = this.props;
    if (empty) {
      fetchFromServer(dispatch,setCategories,setPosts,addComment);
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

    isEmpty(categories) ?categories = []:categories = categories.categories

    let sortFunc;
    if (sorts.sort === 'time') 
      sortFunc = timeComparator;
    else if (sorts.sort === 'comments')
      sortFunc = commentsComparator;
    else
      sortFunc = votesComparator;

    

    posts = Array.from(posts);
    //const deleted_posts = posts.filter((post)=> post.deleted);
    posts = posts.filter((post)=> !post.deleted);
    /*
      
          {
            categories.map((category)=>
              <Route key={`/${category.path}`} path={`/${category.path}`} render={()=>        
                  <SortBy/>
          }/>)
          }

           {
            categories.map((category)=>
              <Route key={"posts" + category.name} exact path={`/${category.path}`}
              render={()=>
                <Posts posts={posts.sort(sortFunc)} filter={category.name} header={category.name}/>
              }/>)
           }
           
           {
            posts.map((post)=> <Route key={post.id} exact path={`/${post.category}/${post.id}`} render={()=>
              <PostDetailed post={post}/>}
            />)
              
           }   
           {
            posts.map((post)=> <Route key={post.id} exact path={`/edit/${post.id}`} render={()=> 
              <Edit post={post}/>
            }/>)
           }
           {categories.map((category)=><Route key={`${category.name}`} exact path={`/${category.path}`} render={()=> <Button/>}/>)
           }
           
    */
    return (
      <div className="body">
        <div className="header">
          <h1>Readable Project</h1>
        </div>
        <div className="main">
        <Tab categories={categories}/>
        <Switch>
          {categories.map((category)=> 
            <Route key={`/${category.name}`}exact path={`/${category.path}`} render={()=><Posts posts={posts.sort(sortFunc)} filter={`${category.name}`}/>}/>
          )}
           <Route key={"new"} exact path="/new" render={()=>
            <New post={{title: '',author: '', body: '', category: 'udacity'}}/>
            }/>
            {
            posts.map((post)=> <Route key={post.id} exact path={`/edit/${post.id}`} render={()=> 
              <Edit post={post}/>
            }/>)
           }
           {
            posts.map((post)=> <Route key={post.id} exact path={`/${post.category}/${post.id}`} render={()=>
              <PostDetailed post={post}/>}
            />)
           }
             
          <Route component={Error}/>
        </Switch>
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
