import { Link, useLoaderData } from "@remix-run/react"
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getPosts } from "~/models/post.server";

type LoaderData = {
    posts: Awaited<ReturnType<typeof getPosts>>
}


export const loader: LoaderFunction = async()=>{
    const posts = await getPosts();
    // const postsString = JSON.stringify({posts});

    return json({posts});
    /*
    return new Response (postsString, {
        headers: {
            'Content-Type': "application/json",

        }
    }); */
}

export default function PostRoute(){
    const {posts} = useLoaderData();
    
    return(
        <main>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link to={post.slug} className="text-blue-600 underline">
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}