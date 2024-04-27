import Post from "./Post";

function Posts(){
  //TEMPORARY
  const posts = [
    {
      id: 1,
      name: "Ricardious",
      userId: 1,
      profilePic:
        "https://seojunyoo.gallerycdn.vsassets.io/extensions/seojunyoo/react-component-preview/1.0.5/1645227049614/Microsoft.VisualStudio.Services.Icons.Default",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://e1.pxfuel.com/desktop-wallpaper/556/915/desktop-wallpaper-how-to-install-reactjs-frontend.jpg",
    },
    {
      id: 2,
      name: "Ricardious",
      userId: 2,
      profilePic:
        "https://seojunyoo.gallerycdn.vsassets.io/extensions/seojunyoo/react-component-preview/1.0.5/1645227049614/Microsoft.VisualStudio.Services.Icons.Default",
      desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;

