const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (favouriteBlog, blog) => {

        return (favouriteBlog.likes > blog.likes ? 
                {title: favouriteBlog.title, author: favouriteBlog.author, likes: favouriteBlog.likes} : 
                {title: blog.title, author: blog.author, likes: blog.likes})
    }
    return blogs.reduce(reducer, { title: '', author: '', likes: 0 })
}

const mostBlogs = (blogs) => {
    var authors = []
    var authorBlogCount = []
    for (i = 0; i < blogs.length; i++){
        currentAuthor = blogs[i].author
        count = 0
        blogs.forEach( blog => {

            if ( !(authors.includes(currentAuthor))) {
                if (blog.author === currentAuthor ) {
                    count += 1
                }
            }
        })

        if ( !(authors.includes(currentAuthor))) {
            authorBlogCount.push({author: currentAuthor, blogs: count})
            authors.push(currentAuthor)
        } 
    }

    const reducer = (mostBlogs, author) => {
        return (
            mostBlogs.blogs > author.blogs ? mostBlogs : author
        )
    }

    return authorBlogCount.reduce(reducer, {author: '', blogs: 0})
}

const mostLikes = (blogs) => {
    var authors = []
    var authorMostLikes = []
    for (i = 0; i < blogs.length; i++){
        currentAuthor = blogs[i].author
        likesCount = 0
        blogs.forEach( blog => {

            if ( !(authors.includes(currentAuthor))) {
                if (blog.author === currentAuthor ) {
                    likesCount += blog.likes
                }
            }
        })

        if ( !(authors.includes(currentAuthor))) {
            authorMostLikes.push({author: currentAuthor, likes: likesCount})
            authors.push(currentAuthor)
        } 
    }

    const reducer = (mostLikes, author) => {
        return (
            mostLikes.likes > author.likes ? mostLikes : author
        )
    }

    return authorMostLikes.reduce(reducer, {author: '', likes: 0})
}

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }  
]

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }