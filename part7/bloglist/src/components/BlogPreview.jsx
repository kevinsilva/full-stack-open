import { Link } from 'react-router-dom'
import { Card, CardContent, Typography } from '@mui/material'

const BlogPreview = ({ blog }) => {
    return (
        <div className="blog-style">
            <Link to={`/blogs/${blog.id}`} className='link'>
            <Card >
                <CardContent>
                <Typography color='textSecondary' variant='h6'>{blog.title} {blog.author}</Typography>
                </CardContent>
            </Card>
            </Link>
        </div>
    )
}

export default BlogPreview
