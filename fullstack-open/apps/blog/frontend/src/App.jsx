import { useState } from 'react'

// npm install mongodb
// mongodb+srv://admin:<password>@cluster0.xolmonh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

function App() {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");
  const [likes, setLikes] = useState("");
  const [blogList, setBlogList] = useState([
    {
    author: "John Doe",
    title: "How To Jane Doe",
    url: "johndoe.com/how-to-john-doe/",
    likes: 50
    },
    {
      author: "Jackie Chan",
      title: "From Highs To Lows",
      url: "jackiechan.com/from-highs-to-lows/",
      likes: 1021
      }
  ])

  function onSubmit (e) {
    e.preventDefault();

    console.log(blogList);

    const newBlogList = blogList.concat({
      author: author,
      title: title,
      url: url,
      likes: likes
    })
    
    setBlogList(newBlogList)
    setTitle("")
    setAuthor("")
    setURL("")
    setLikes("")

  }

  function handleChange(e, setter) {
    setter(e.target.value)
  }

  return (
    <>
      <h1>Blog List</h1>
      <div>
        <ul>
          {
            blogList.map (article => {
              console.log(article.url)
              return <li key={<b>{article.url}</b>}>{article.title} by {article.author}</li>
            })
          }
        </ul>
      </div>

      <h2>Submit a blog</h2>
      <form onSubmit={onSubmit}>
        <div>Title: <input type="text" value={title} onChange={(title) => handleChange(title, setTitle)}/></div>
        <div>Author: <input type="text" value={author}  onChange={(author) => handleChange(author, setAuthor)}/></div>
        <div>URL: <input type="text"  value={url}  onChange={(url) => handleChange(url, setURL)}/></div>
        <div>Likes: <input type="text"  value={likes}  onChange={(likes) => handleChange(likes, setLikes)}/></div>
        <button type="submit">Submit</button>
      </form>

    </>
  )
}

export default App
