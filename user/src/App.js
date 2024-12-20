import "./App.css";
import Header from "./Header";
import Post from "./Post";
import {BrowserRouter , Route, Routes } from 'react-router-dom';
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./Usercontext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import About from "./pages/About";
import ErrorBoundary from "./Errorboundary";

function App() {
  return (
    <main>
      <ErrorBoundary>
      <UserContextProvider>
      <BrowserRouter>
       <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route index element={<IndexPage />}/>
          <Route path="/about-me" element={<About />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/create" element={<CreatePost />}/>
          <Route path="/post" element={<Post />}/>
          <Route path="/post/:id" element={<PostPage />}/>
          <Route path="/edit/:id" element={<EditPost />}/>
           
        </Route>
      </Routes>
      </BrowserRouter>
      </UserContextProvider>
      </ErrorBoundary>
    </main>
  );
}

export default App;
